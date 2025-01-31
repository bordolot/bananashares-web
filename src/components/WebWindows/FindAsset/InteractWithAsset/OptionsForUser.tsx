import { FormEvent, useState } from "react";
import { Offer } from "./Offer";
import { ButtonStandard } from "../../../../components_generic/Button";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import { TxArgs_ChangeOffer, TxArgs_PayDividend, TxArgs_Withdraw } from "../../../../utility/Interfaces";
import { ModalChangeSharesForm } from "../../../Modals/ModalChangeSharesForm";
import { useWallet } from "../../../../blockchain/WalletInterface";

export const OptionsForUser: React.FC = () => {
    // export function OptionsForUser({ userInfo, userOffer, changeOfferTx, payDividendTx, withdrawTx }: OptionsForUserProps) {
    const { assetInterface } = useWallet();

    const [shouldShowChangeOffer, setShouldShowChangeOffer] = useState(false);

    async function makeSellOffer(event: FormEvent<HTMLFormElement>) {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }

            event.preventDefault();
            event.stopPropagation();

            const formData = new FormData(event.currentTarget);
            const price_per_share = formData.get("price_per_share") as unknown as number;

            const uint128Max = 2 ** 128 - 1;
            const price_per_share_in_WEI = price_per_share * WEI_IN_ETHER
            if (price_per_share <= 0 || price_per_share_in_WEI > uint128Max) {
                throw Error("Please correct price per share.");
            }
            const formated_price_per_share_in_WEI = BigInt(price_per_share_in_WEI);

            const _args: TxArgs_ChangeOffer = {
                newLimit: formated_price_per_share_in_WEI,
            };
            const result = await assetInterface.current.changeOfferTx(_args);
            setShouldShowChangeOffer(false)
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error)
        }
    }

    async function payDividend() {
        try {
            if (!assetInterface.current || !assetInterface.current.info_user) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_PayDividend = {
                address: assetInterface.current.info_user.userAddress,
                howManyPayments: assetInterface.current.info_user.howManyPayments,
            };
            const result = assetInterface.current.payDividendTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error);
        }
    }

    function payEther() {
        try {
            if (!assetInterface.current || !assetInterface.current.info_user) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_Withdraw = {
                amount: assetInterface.current.info_user.ether,
            };

            const result = assetInterface.current.withdrawTx(_args);
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
        {shouldShowChangeOffer && (
            <ModalContent onClose={() => { setShouldShowChangeOffer(false) }}>
                {/* {children} */}

                <Form
                    submitName="submit"
                    handleSubmit={makeSellOffer}>
                    <ModalChangeSharesForm />
                </Form>
            </ModalContent>
        )}

        <h4 className="my-1 text-3xl">Your standard options:</h4>

        {(assetInterface.current.info_userOffer.amount > 0)
            ?
            <>
                Your active offer:
                {/* <Offer
                    from={undefined}
                    amount={Number(assetInterface.current.info_userOffer.amount)}
                    sharePrice={Number(assetInterface.current.info_userOffer.valuePerShare)} /> */}
                <ButtonStandard
                    handleClick={() => { setShouldShowChangeOffer(true) }}
                    buttonName="Change Offer" />
            </>
            :
            <>
                You have no active offers.
            </>
        }
        <div className="my-4"></div>
        {(assetInterface.current.info_user.isThereAnyDividend)
            ?
            <>
                <div>You have divident to collect: {Number(assetInterface.current.info_user.dividend) / WEI_IN_ETHER} [ether]</div>
                <ButtonStandard
                    handleClick={payDividend}
                    buttonName="Collect" />
            </>
            :
            <>
                You have no dividends to collect.
            </>
        }
        <div className="my-4"></div>
        {(assetInterface.current.info_user.isThereAnyEther)
            ?
            <>
                <>
                    <div>You can withdraw: {Number(assetInterface.current.info_user.ether) / WEI_IN_ETHER} [ether]</div>
                    <ButtonStandard
                        handleClick={payEther}
                        buttonName="Withdraw" />
                </>
            </>
            :
            <>
                You have no ether to withdraw.
            </>
        }


        {/* <Offer /> */}
    </>)
}