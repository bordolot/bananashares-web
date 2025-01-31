import React, { useEffect } from "react";
// import { ButtonStandard } from "../../../../components_generic/Button";
import { WEI_IN_ETHER, TOTAL_SUPLY, BIPS } from "../../../../utility/Globals";
import { TitleValueInOneLine, ValueUnit } from "../../../../components_generic/SimpleCompenents";
import InfoRevealer from "../../../../components_generic/InfoRevealer";
import { ButtonStandard, ButtonStandardToWallet } from "../../../../components_generic/Button";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { Info_RegularOffer, TxArgs_CancelOffer, TxArgs_PayDividend, TxArgs_PayEarndFeesToAllPrivileged } from "../../../../utility/Interfaces";

interface OfferProps {
    from: string | undefined | null;
    amount: number;
    sharePrice: number;
    changeOffer: () => void;
    title?: string;
}

export const Offer: React.FC<OfferProps> = ({ from, amount, sharePrice, changeOffer, title }) => {
    const { assetInterface } = useWallet();



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

    if (!from && !amount && !sharePrice) {
        return (<>Empty Offer!</>);
    }
    return (
        <div className="flex">
            <div className="bgOffer p-3 rounded-2xl">
                {title && <div className="textStandardBold ">{title}</div>}
                <StandardOfferDesc from={from} amount={amount} sharePrice={sharePrice} />
                <div className="flex space-x-3">
                    <ButtonStandardToWallet
                        handleClick={cancelOffer}
                        buttonName="Cancell Offer" />
                    <ButtonStandard
                        handleClick={changeOffer}
                        buttonName="Change Offer" />
                </div>
            </div>
        </div>
    );
}


interface InAllOfferProps {
    offer: Info_RegularOffer;
    handleBuyShares: (offer: Info_RegularOffer) => () => void;
}


export const InAllOffer: React.FC<InAllOfferProps> = ({ offer, handleBuyShares }) => {

    const { assetInterface } = useWallet();

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



    if (!offer.addressFrom && !offer.amount && !offer.valuePerShare) {
        return (<>Empty Offer!</>);
    }
    return (
        <div className="flex">
            <div className="bgOffer p-3 rounded-2xl w-96">
                <StandardOfferDesc from={offer.addressFrom} amount={offer.amount} sharePrice={offer.valuePerShare} />

                <div className="flex space-x-3">

                    {offer.addressFrom.toLowerCase()
                        == assetInterface.current?.info_user?.userAddress.toLowerCase()
                        ?
                        <div className="textStandardBold">This is your offer.</div>

                        :
                        (
                            (assetInterface.current?.info_user?.isThereAnyDividend
                                || assetInterface.current?.info_user?.isThereAnyFees)
                                ?
                                (assetInterface.current?.info_user?.isThereAnyDividend
                                    ?
                                    (<>To buy shares collect your dividend.</>) :
                                    (<>To buy shares collect your fees.</>)
                                )
                                :
                                (<>
                                    {offer.isThereAnyDividend && (
                                        <>
                                            <InfoRevealer explanation={<div>To buy shares from this user, you need to collect their dividend for them.<br /> There are {offer.howManyPayments} payments to collect.</div>} width={1} />
                                            <ButtonStandardToWallet buttonName={"Pay dividend"} handleClick={handlePayDividend(offer)} />
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
                    }


                </div>
            </div>

        </div>
    );
}


interface StandardDescriptionProps {
    from: string | undefined | null;
    amount: number;
    sharePrice: number;
}

const StandardOfferDesc: React.FC<StandardDescriptionProps> = ({
    from, amount, sharePrice
}) => {
    return (<>

        <div className="flex">
            <div className="textStandardBold">From:</div>
            <div className="mr-3"></div>
            <div className="textStandard flex items-end text-base break-all">{from}</div>
        </div>

        <TitleValueInOneLine
            title="Shares:"
            distanse={"mr-2"}
            value={
                <div>
                    <div>{amount}</div>
                    <div> {(BIPS * amount / TOTAL_SUPLY).toFixed(2)}%</div>
                </div>} />
        <div className="mr-4"></div>

        <TitleValueInOneLine
            title="Total price:"
            distanse={"mr-2"}
            value={
                <div className="flex">
                    <InfoRevealer explanation={<ValueUnit value={(BigInt(sharePrice) * BigInt(amount)).toString()} unit={"WEI"} />} />
                    {(sharePrice / WEI_IN_ETHER * amount).toFixed(5)} ETH
                </div>} />

        <TitleValueInOneLine
            title="Price/share:"
            distanse={"mr-2"}
            value={
                <div className="flex">
                    <InfoRevealer explanation={<ValueUnit value={sharePrice} unit={"WEI"} />} />
                    {(sharePrice / WEI_IN_ETHER).toFixed(5)} ETH
                </div>} />
    </>);
}
