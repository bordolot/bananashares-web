import React, { FormEvent, useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import { Offer } from "./Offer";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { ModalSellShares } from "../../../Modals/ModalSellShares";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { TxArgs_CancelOffer, TxArgs_MakeSellOffer, TxArgs_PayDividend, TxArgs_PayEarndFeesToAllPrivileged, TxArgs_Withdraw } from "../../../../utility/Interfaces";
import { getSharesFromSongInfo } from "../../../../blockchain/utilities/commonMethods";

// import { UserInfo, UserOffer } from "./InteractWithSong";


// interface OptionsForPrivilegedUserProps {
//     userInfo: UserInfo;
//     userOffer: UserOffer | void;
//     numberOfShares: number;
//     makeSellOfferTx: (
//         _amount: BigInt,
//         _newPrice: BigInt) => void;
//     cancelOfferTx: () => void;
//     payEarndFeesToAllPrivilegedTx: () => void;
//     payDividendTx: (
//         _address: string,
//         _howManyPayments: number) => void;
//     withdrawTx: (
//         _amount: BigInt) => void;
// }

export const OptionsForPrivilegedUser: React.FC = () => {
    const { assetInterface } = useWallet();

    const [shouldShowSellOffer, setShouldShowSellOffer] = useState(false);



    async function payDividend() {
        try {
            if (!assetInterface.current || !assetInterface.current.info_user) {
                throw Error("There was a problem with Asset contract interface.");
            }

            const _args: TxArgs_PayDividend = {
                address: assetInterface.current.info_user.userAddress,
                howManyPayments: assetInterface.current.info_user.howManyPayments,
            };
            const result = await assetInterface.current.payDividendTx(_args);
            if (!result) { throw Error("Transaction failed"); }

        } catch (error: any) {
            alert(error);
        }
    }



    async function payFees() {
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
    }


    async function payEther() {
        try {
            if (!assetInterface.current || !assetInterface.current.info_user) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_Withdraw = {
                amount: assetInterface.current.info_user.ether
            };
            const result = await assetInterface.current.withdrawTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }
    }

    async function makeSellOffer(event: FormEvent<HTMLFormElement>) {
        try {

            if (!assetInterface.current || !assetInterface.current.info_asset || !assetInterface.current.info_user) {
                throw Error("There was a problem with Asset contract interface.");
            }

            event.preventDefault();
            event.stopPropagation();

            const formData = new FormData(event.currentTarget);
            const number_of_shares = formData.get("number_of_shares") as unknown as number;
            const price_per_share = formData.get("price_per_share") as unknown as number;

            const _numberOfShares = getSharesFromSongInfo(assetInterface.current.info_user.userAddress, assetInterface.current.info_asset)
            if (number_of_shares > _numberOfShares) {
                throw Error(`You cannot exceed yor number of shares: ${_numberOfShares}.`);
            }

            const uint24Max = 2 ** 24 - 1;
            if (number_of_shares <= 0 || number_of_shares > uint24Max) {
                throw Error("Please correct shares.");
            }

            const formated_number_of_shares = BigInt(number_of_shares)

            const uint128Max = 2 ** 128 - 1;
            const price_per_share_in_WEI = price_per_share * WEI_IN_ETHER
            if (price_per_share <= 0 || price_per_share_in_WEI > uint128Max) {
                throw Error("Please correct price per share.");
            }
            const formated_price_per_share_in_WEI = BigInt(price_per_share_in_WEI)

            const _args: TxArgs_MakeSellOffer = {
                amount: formated_number_of_shares,
                newPrice: formated_price_per_share_in_WEI
            };
            const result = await assetInterface.current.makeSellOfferTx(_args);
            setShouldShowSellOffer(false)
            if (!result) { throw Error("Transaction failed"); }

        } catch (error: any) {
            alert(error);
        }


    }

    async function cancelOffer() {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_CancelOffer = {};
            const result = await assetInterface.current.cancelOfferTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }
    }

    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_user) {
        return (<>Asset info "info_user" not read.</>)
    }
    if (!assetInterface.current.info_asset) {
        return (<>Asset info "info_asset" not read.</>)
    }
    if (!assetInterface.current.info_userOffer) {
        return (<>Asset info "info_userOffer" not read.</>)
    }

    return (<>
        {shouldShowSellOffer && (
            <ModalContent onClose={() => { setShouldShowSellOffer(false) }}>
                {/* {children} */}

                <Form
                    submitName="submit"
                    handleSubmit={makeSellOffer}>
                    <ModalSellShares numberOfShares={getSharesFromSongInfo(assetInterface.current.info_user.userAddress, assetInterface.current.info_asset)} />
                </Form>
            </ModalContent>
        )}

        {assetInterface.current.info_userOffer.amount != 0 ?
            <>
                <div>Your pending offer:</div>
                <Offer
                    from={undefined}
                    amount={assetInterface.current.info_userOffer.amount}
                    sharePrice={assetInterface.current.info_userOffer.valuePerShare} />
                <div className="flex">
                    <ButtonStandard
                        handleClick={cancelOffer}
                        buttonName="Cancell Offer" />
                    <ButtonStandard
                        handleClick={() => { setShouldShowSellOffer(true) }}
                        buttonName="Change Offer" />
                </div>

            </>
            :
            <>
                <div>You have no offers. Create one:</div>
                <ButtonStandard
                    handleClick={() => { setShouldShowSellOffer(true) }}
                    buttonName="Make Sell Offer" />
            </>
        }


        {assetInterface.current.info_user.isThereAnyDividend
            ?
            <>
                <div>You have divident to collect: {Number(assetInterface.current.info_user.dividend) / WEI_IN_ETHER} [ether]</div>
                <ButtonStandard
                    handleClick={payDividend}
                    buttonName="Collect" />
            </>
            : <></>}

        {assetInterface.current.info_user.isThereAnyFees ?
            <>
                <div>You have fees to collect: {Number(assetInterface.current.info_user.fees) / WEI_IN_ETHER} [ether]</div>
                <ButtonStandard
                    handleClick={payFees}
                    buttonName="Collect" />
            </> : <></>}

        {assetInterface.current.info_user.isThereAnyEther ?
            <>
                <div>You can withdraw: {Number(assetInterface.current.info_user.ether) / WEI_IN_ETHER} [ether]</div>
                <ButtonStandard
                    handleClick={payEther}
                    buttonName="Withdraw" />
            </> : <></>}

    </>)
}