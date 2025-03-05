import React from "react";
// import { ButtonStandard } from "../../../../components_generic/Button";
import { WEI_IN_ETHER, TOTAL_SUPLY, BIPS } from "../../../../utility/Globals";
import { TitleValueInOneLine, ValueUnit } from "../../../../components_generic/SimpleCompenents";
import InfoRevealer from "../../../../components_generic/InfoRevealer";
import { ButtonStandard, ButtonStandardToWallet } from "../../../../components_generic/Button";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { Info_RegularOffer, TxArgs_CancelOffer, TxArgs_PayDividend, TxArgs_PayEarndFeesToAllPrivileged } from "../../../../utility/Interfaces";
import { checkIfUserIsPrivileged, getNumberOfGovTokensToMintInAsset } from "../../../../blockchain/utilities/commonMethods";

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
                    {assetInterface.current?.isCurrentUserPrivileged ?
                        <ButtonStandardToWallet
                            handleClick={cancelOffer}
                            buttonName="Cancell Offer" /> : <></>
                    }
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

    const { assetInterface, assetFactoryInterface, tokenInterface } = useWallet();

    const handlePayFees = () => async () => {
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

    const getNumberOfGovTokensToMint = (_numberOfSharesInOffer: number): number => {
        let _valueToMint_forRegular;
        // let _valueToMint_forPrivileged;
        if (!assetFactoryInterface.current) {
            return 0;
        }
        if (!tokenInterface.current) {
            return 0;
        }
        if (!assetInterface.current) {
            return 0;
        }
        if (!assetInterface.current.info_asset) {
            return 0;
        }
        const _govTokensData: [number, number] = getNumberOfGovTokensToMintInAsset(
            Number(assetFactoryInterface.current.currentBlockNr),
            Number(assetFactoryInterface.current.protocolDeploymentBlockNr),
            Number(tokenInterface.current.availableToMint),
            Number(assetInterface.current.info_asset.govTokensMinted))
        const _govTokensToMint: number = _govTokensData[0];
        const _tokensDivisor: number = _govTokensData[1];
        let _numberOfTokensToMint = Math.floor(_numberOfSharesInOffer / _tokensDivisor);
        if (_govTokensToMint < 2) {
            return 0;
        }
        if (tokenInterface.current.availableToMint == 1) {
            return 1;
        }
        if (_numberOfTokensToMint < 2) {
            return 0;
        }

        if (_numberOfTokensToMint > _govTokensToMint) {
            _numberOfTokensToMint = _govTokensToMint;
        }

        _valueToMint_forRegular = Math.floor(_numberOfTokensToMint / 2);
        // _valueToMint_forPrivileged = _numberOfTokensToMint - _valueToMint_forRegular;

        return _valueToMint_forRegular;
    }



    if (!offer.addressFrom && !offer.amount && !offer.valuePerShare) {
        return (<>Empty Offer!</>);
    }
    if (!assetInterface.current) {
        return (<>Empty Asset!</>);
    }
    if (!assetInterface.current.info_asset) {
        return (<>Empty Asset!</>);
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
                                (<div>
                                    {offer.isThereAnyDividend && (
                                        <div className="flex">
                                            <InfoRevealer explanation={<div>To buy shares from this user, you need to collect their dividend for them.<br /> There {offer.howManyPayments == 1 ? "is" : "are"} {offer.howManyPayments} payments to collect.</div>} width={70} />
                                            <ButtonStandardToWallet buttonName={"Pay dividend"} handleClick={handlePayDividend(offer)} />
                                        </div>
                                    )}
                                    {offer.isThereAnyFees && (
                                        <div className="flex">
                                            <InfoRevealer explanation={<div>To buy shares from this user, you need to collect their fees for them.</div>} width={70} />
                                            <ButtonStandardToWallet buttonName={"Pay fees"} handleClick={handlePayFees()} />
                                        </div>
                                    )}
                                    {!offer.isThereAnyDividend && !offer.isThereAnyFees && (
                                        <ButtonStandard buttonName={"Buy shares"} handleClick={handleBuyShares(offer)} />
                                    )}

                                    {checkIfUserIsPrivileged(offer.addressFrom, assetInterface.current.info_asset) &&
                                        getNumberOfGovTokensToMint(offer.amount) > 0 &&
                                        <TitleValueInOneLine
                                            title="You can mint:"
                                            distanse={"mr-2"}
                                            value={
                                                <div className="flex">
                                                    {getNumberOfGovTokensToMint(offer.amount)} Bananashares tokens
                                                </div>} />
                                    }

                                </div>)


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
