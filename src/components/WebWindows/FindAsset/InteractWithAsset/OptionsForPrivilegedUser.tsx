import React, { FormEvent, useState } from "react";
import { ButtonStandard, ButtonStandardToWallet } from "../../../../components_generic/Button";
import { Offer } from "./Offer";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { ModalSellShares } from "../../../Modals/ModalSellShares";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { TxArgs_MakeSellOffer, TxArgs_PayDividend, TxArgs_PayEarndFeesToAllPrivileged, TxArgs_Withdraw } from "../../../../utility/Interfaces";
import { checkIfEtherIsLocked, getLockPeriod, getSharesFromSongInfo, getNumberOfGovTokensToMintInAsset } from "../../../../blockchain/utilities/commonMethods";
import { TitleValueInOneLine, ValueUnit } from "../../../../components_generic/SimpleCompenents";
import InfoRevealer from "../../../../components_generic/InfoRevealer";


export const OptionsForPrivilegedUser: React.FC = () => {
    const { assetInterface, userAddress, assetFactoryInterface, tokenInterface } = useWallet();

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

    if (!assetFactoryInterface.current) {
        return (<>No Asset Factory Interface!!!</>)
    }
    if (!tokenInterface.current) {
        return (<>No Token Interface!!!</>)
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
                    submitName="Send transaction"
                    handleSubmit={makeSellOffer}>
                    <ModalSellShares
                        numberOfShares={
                            getSharesFromSongInfo(
                                assetInterface.current.info_user.userAddress,
                                assetInterface.current.info_asset)}
                        govTokensData={
                            getNumberOfGovTokensToMintInAsset(
                                Number(assetFactoryInterface.current.currentBlockNr),
                                Number(assetFactoryInterface.current.protocolDeploymentBlockNr),
                                Number(tokenInterface.current.availableToMint),
                                Number(assetInterface.current.info_asset.govTokensMinted))
                        }
                    />
                </Form>
            </ModalContent>
        )}

        <div className="flex flex-wrap gap-10">

            {assetInterface.current.info_userOffer.amount != 0 ?
                <>
                    <Offer
                        from={userAddress}
                        amount={assetInterface.current.info_userOffer.amount}
                        sharePrice={assetInterface.current.info_userOffer.valuePerShare}
                        changeOffer={() => { setShouldShowSellOffer(true) }}
                        title="Your pending offer:" />
                </>
                :

                <div className="bgOffer p-3 rounded-2xl   h-full">
                    <div className="textStandard">You have no offers.</div>
                    <div className="mt-auto">
                        <ButtonStandard
                            handleClick={() => { setShouldShowSellOffer(true) }}
                            buttonName="Make Sell Offer" />
                    </div>

                </div>

            }

            {assetInterface.current.info_user.isThereAnyDividend
                ?

                <div className="bgOffer p-3 rounded-2xl h-full ">
                    <div className="textStandard">You have dividend to collect.</div>

                    <TitleValueInOneLine
                        title="Amount:"
                        distanse={"mr-2"}
                        value={
                            <div className="flex">
                                <InfoRevealer explanation={<ValueUnit value={Number(assetInterface.current.info_user.dividend)} unit={"WEI"} />} />
                                {(Number(assetInterface.current.info_user.dividend) / WEI_IN_ETHER).toFixed(5)} ETH
                            </div>} />

                    <ButtonStandardToWallet
                        handleClick={payDividend}
                        buttonName="Collect" />
                </div>

                :
                <></>
            }

            {assetInterface.current.info_user.isThereAnyFees ?
                <div className="bgOffer p-3 rounded-2xl h-full">
                    <div className="textStandard">You have fees to collect.</div>
                    <TitleValueInOneLine
                        title="Amount:"
                        distanse={"mr-2"}
                        value={
                            <div className="flex">
                                <InfoRevealer explanation={<ValueUnit value={Number(assetInterface.current.info_user.fees)} unit={"WEI"} />} />
                                {(Number(assetInterface.current.info_user.fees) / WEI_IN_ETHER).toFixed(5)} ETH
                            </div>} />
                    <ButtonStandardToWallet
                        handleClick={payFees}
                        buttonName="Collect" />
                </div>
                : <></>}

            {assetInterface.current.info_user.isThereAnyEther ?

                (
                    checkIfEtherIsLocked(
                        Number(assetFactoryInterface.current.currentBlockNr),
                        Number(assetInterface.current.info_user.lastBlockGovTokenMinted)
                    )
                        ?
                        <div className="bgOffer p-3 rounded-2xl h-full">
                            <div className="textStandard">You have ether to withdraw.</div>
                            <TitleValueInOneLine
                                title="Amount:"
                                distanse={"mr-2"}
                                value={
                                    <div className="flex">
                                        <InfoRevealer explanation={<ValueUnit value={Number(assetInterface.current.info_user.ether)} unit={"WEI"} />} />
                                        {(Number(assetInterface.current.info_user.ether) / WEI_IN_ETHER).toFixed(5)} ETH
                                    </div>} />

                            <div className="textStandard">Because you were minted Bananashares tokens,</div>
                            <div className="textStandard">you need to wait for the lock period before you are allowed to withdraw.</div>
                            <TitleValueInOneLine
                                title="Lock period:"
                                distanse={"mr-2"}
                                value={
                                    <div className="flex">
                                        {getLockPeriod(
                                            Number(assetFactoryInterface.current.currentBlockNr),
                                            Number(assetInterface.current.info_user.lastBlockGovTokenMinted)
                                        )} days
                                    </div>} />


                        </div>
                        :
                        <div className="bgOffer p-3 rounded-2xl h-full">
                            <div className="textStandard">You can withdraw ether.</div>
                            <TitleValueInOneLine
                                title="Amount:"
                                distanse={"mr-2"}
                                value={
                                    <div className="flex">
                                        <InfoRevealer explanation={<ValueUnit value={Number(assetInterface.current.info_user.ether)} unit={"WEI"} />} />
                                        {(Number(assetInterface.current.info_user.ether) / WEI_IN_ETHER).toFixed(5)} ETH
                                    </div>} />
                            <ButtonStandardToWallet
                                handleClick={payEther}
                                buttonName="Withdraw" />
                        </div>
                )


                : <></>}

        </div>

    </>)
}