import React, { useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import ModalContent from "../../../Modals/Modal";
import { HashVeryfier } from "../../../Utilities/FileHasher";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { TOTAL_SUPLY } from "../../../../utility/Globals";
import { TitleValueInOneLine } from "../../../../components_generic/SimpleCompenents";
import InfoRevealer from "../../../../components_generic/InfoRevealer";




export const AssetInfoComponent: React.FC = () => {
    const { assetInterface } = useWallet();
    const [shouldShowCheckHash, setShouldCheckHash] = useState(false);




    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_asset) {
        return (<>No Asset Info!!!</>)
    }

    return (
        <>
            {shouldShowCheckHash && (
                <ModalContent onClose={() => { setShouldCheckHash(false); }}>
                    {/* {children} */}
                    <div>
                        <TitleValueInOneLine
                            title={<div className="textStandardBold whitespace-nowrap">Asset hash:</div>}
                            distanse={"mr-4"}
                            value={<div className="break-all textStandard">{assetInterface.current.info_asset.hash}</div>} />

                        <div></div>
                        <div className="bgStandard2 p-2 rounded-lg">
                            <div className="textStandard">Upload original(decoded) manifest:</div>
                            <HashVeryfier
                                trueKeccak256String={assetInterface.current.info_asset.hash}
                                isFileBase64={false} buttonId={"file-1"} />
                        </div>

                        <div className="mb-3"></div>
                        <div className="bgStandard2 p-2 rounded-lg">
                            <div className="textStandard">Upload base64 encoded manifest:</div>
                            <HashVeryfier
                                trueKeccak256String={assetInterface.current.info_asset.hash}
                                isFileBase64={true} buttonId={"file-2"} />
                        </div>
                        <div></div>

                    </div>
                </ModalContent>
            )}




            <div className="relative w-full">
                <div className="textHeader">Asset</div>
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></div>
            </div>
            <TitleValueInOneLine
                title={"Title:"}
                distanse={"mr-4"}
                value={assetInterface.current.info_asset.title} />
            <TitleValueInOneLine
                title={"Hash:"}
                distanse={"mr-3"}
                value={assetInterface.current.info_asset.hash} />

            <div className="flex">
                <InfoRevealer explanation={"Always review the decoded manifest before using the contract."} width={100} />
                <div className="mr-1"></div>
                <ButtonStandard
                    buttonName="Verify hash"
                    handleClick={() => setShouldCheckHash(true)}
                />
            </div>




            <div className="relative w-full">
                <div className="textHeader mt-10">Privileged shareholders:</div>
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></div>
            </div>
            <div className="flex flex-wrap gap-10">
                {assetInterface.current.info_asset.names.map((name, index) => (
                    <div className=" mb-5" key={index}>
                        <TitleValueInOneLine
                            title={"Name:"}
                            distanse={"mr-6"}
                            value={name} />
                        <TitleValueInOneLine
                            title={"Address:"}
                            distanse={"mr-2"}
                            value={assetInterface.current?.info_asset?.addresses[index] ?? ""} />
                        <TitleValueInOneLine
                            title={"Shares:"}
                            distanse={"mr-5"}
                            value={
                                <div className="">
                                    {Number(assetInterface.current?.info_asset?.shares[index])}
                                    <div className="textStandard">{(Number(assetInterface.current?.info_asset?.shares[index]) / TOTAL_SUPLY * 100).toFixed(2)}%</div>
                                </div>
                            } />

                    </div>
                ))}

            </div>

        </>
    )

}