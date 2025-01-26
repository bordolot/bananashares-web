import React, { FormEvent, useReducer } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import { Info_RegularOffer, TxArgs_BuyShares, TxArgs_PayEarndFeesToAllPrivileged, TxArgs_PayDividend } from "../../../../utility/Interfaces";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { ModalBuySharesForm } from "../../../Modals/ModalBuyShares";

import { useWallet } from "../../../../blockchain/WalletInterface";


interface State {
    shouldShowBuyShares: boolean;
    activeOffer: Info_RegularOffer | null;
}

type Action =
    | { type: 'SET_ACTIVE_OFFER'; offer: Info_RegularOffer }
    | { type: 'HIDE_BUY_SHARES_MODAL' }
    | { type: 'SHOW_BUY_SHARES_MODAL' };

const initialState: State = {
    shouldShowBuyShares: false,
    activeOffer: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ACTIVE_OFFER':
            return { ...state, activeOffer: action.offer, shouldShowBuyShares: true };
        case 'HIDE_BUY_SHARES_MODAL':
            return { ...state, shouldShowBuyShares: false };
        case 'SHOW_BUY_SHARES_MODAL':
            return { ...state, shouldShowBuyShares: true };
        default:
            return state;
    }
}
export const Offers: React.FC = () => {
    const { assetInterface } = useWallet();

    const [state, dispatch] = useReducer(reducer, initialState);
    const handleBuyShares = (offer: Info_RegularOffer) => () => {
        dispatch({ type: 'SET_ACTIVE_OFFER', offer });
    };

    async function handleBuySharesModal(event: FormEvent<HTMLFormElement>) {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }

            event.preventDefault();
            event.stopPropagation();

            const formData = new FormData(event.currentTarget);
            const number_of_shares = formData.get("number_of_shares") as unknown as number;
            const new_price_per_share = formData.get("price_per_share") as unknown as number;

            if (!state.activeOffer) {
                throw Error("There was no active offer.");
            }
            if (number_of_shares > state.activeOffer.amount) {
                throw Error(`You cannot exceed yor number of shares: ${state.activeOffer.amount}.`);
            }

            const uint24Max = 2 ** 24 - 1;
            if (number_of_shares <= 0 || number_of_shares > uint24Max) {
                throw Error(`Please correct shares.`);
            }

            const formated_number_of_shares = BigInt(number_of_shares)

            const uint128Max = 2 ** 128 - 1;
            const price_per_share_in_WEI = new_price_per_share * WEI_IN_ETHER
            if (new_price_per_share <= 0 || price_per_share_in_WEI > uint128Max) {
                throw Error(`Please correct price per share.`);
            }
            const formated_price_per_share_in_WEI = BigInt(price_per_share_in_WEI)

            const totalEtherToPay_WEI = BigInt(number_of_shares * state.activeOffer.valuePerShare)
            // console.log("totalEtherToPay ", totalEtherToPay_WEI)

            const _args: TxArgs_BuyShares = {
                addressFrom: state.activeOffer.addressFrom,
                amount: formated_number_of_shares,
                sellLimit: formated_price_per_share_in_WEI,
                etherToPay: totalEtherToPay_WEI,
            };
            const result = await assetInterface.current.buySharesTx(_args);
            dispatch({ type: 'HIDE_BUY_SHARES_MODAL' });
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }



    }

    const handlePayFees = (offer: Info_RegularOffer) => async () => {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_PayEarndFeesToAllPrivileged = {};
            const result = await assetInterface.current.payEarndFeesToAllPrivilegedTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }
    };

    const handlePayDividend = (offer: Info_RegularOffer) => async () => {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_PayDividend = {
                address: offer.addressFrom,
                howManyPayments: BigInt(offer.howManyPayments),
            };
            const result = await assetInterface.current.payDividendTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }
    };

    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_allOffers) {
        return (<>Asset info "info_allOffers" not read.</>)
    }
    if (!assetInterface.current.info_user) {
        return (<>Asset info "info_asset" not read.</>)
    }

    return (<>
        {/* <Offer /> */}

        {state.activeOffer && state.shouldShowBuyShares && (
            <ModalContent onClose={() => dispatch({ type: 'HIDE_BUY_SHARES_MODAL' })}>
                <Form
                    submitName="submit"
                    handleSubmit={handleBuySharesModal}>
                    <ModalBuySharesForm numberOfShares={state.activeOffer.amount} pricePerShare={state.activeOffer.valuePerShare} />
                </Form>
            </ModalContent>
        )}

        {assetInterface.current.info_allOffers.map((offer, index) => (
            <div key={offer.id} className="flex items-center mb-2">
                Number of shares: {offer.amount} Price per share: {offer.valuePerShare / WEI_IN_ETHER} [Ether]

                {offer.addressFrom.toLowerCase() !== assetInterface.current?.info_user?.userAddress.toLowerCase() ? (
                    ((assetInterface.current?.info_user?.isThereAnyDividend || assetInterface.current?.info_user?.isThereAnyFees) ?
                        (assetInterface.current?.info_user?.isThereAnyDividend ?
                            (<> - first colect dividends</>) :
                            (<> - first colect fees</>)
                        )
                        :
                        (<>
                            {offer.isThereAnyDividend && (
                                <>
                                    <ButtonStandard buttonName={"Pay dividend"} handleClick={handlePayDividend(offer)} /><>payments: {offer.howManyPayments}</>
                                </>
                            )}
                            {offer.isThereAnyFees && (
                                <ButtonStandard buttonName={"Pay fees"} handleClick={handlePayFees(offer)} />
                            )}
                            {!offer.isThereAnyDividend && !offer.isThereAnyFees && (
                                <ButtonStandard buttonName={"Buy shares"} handleClick={handleBuyShares(offer)} />
                            )}
                        </>)


                    )
                ) : (
                    <> - this is yours offer</>
                )}


                {/* {offer.addressFrom.toLowerCase() !== userAddress.toLowerCase() ? (offer.isThereAnyDividend && <ButtonStandard buttonName={"Pay dividend"} handleClick={handleBuyShares(offer)} />) : null}
                {offer.addressFrom.toLowerCase() !== userAddress.toLowerCase() ? (offer.isThereAnyFees && <ButtonStandard buttonName={"Pay fees"} handleClick={handleBuyShares(offer)} />) : null}
                {offer.addressFrom.toLowerCase() !== userAddress.toLowerCase() ? (!offer.isThereAnyDividend && !offer.isThereAnyFees && <ButtonStandard buttonName={"Buy shares"} handleClick={handleBuyShares(offer)} />) : null} */}
            </div>
        ))}


    </>)
}