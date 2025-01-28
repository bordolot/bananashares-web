import React, { useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import ModalContent from "../../../Modals/Modal";
import FileHasher from "../../../Utilities/FileHasher";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { TOTAL_SUPLY } from "../../../../utility/Globals";



export const AssetInfoComponent: React.FC = () => {
    const { assetInterface } = useWallet();
    const [shouldShowCheckHash, setShouldCheckHash] = useState(false);
    const [keccak256String, setKeccak256String] = useState<string | null>(null);




    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_asset) {
        return (<>No Asset Info!!!</>)
    }

    return (
        <>
            {shouldShowCheckHash && (
                <ModalContent onClose={() => { setShouldCheckHash(false); setKeccak256String(null) }}>
                    {/* {children} */}
                    <div>
                        Song hash: {assetInterface.current.info_asset.hash}

                        <h1 className="my-4 text-xl">
                            Upload your audio:
                        </h1>
                        <div></div>
                        <FileHasher
                            keccak256String={keccak256String}
                            setKeccak256String={setKeccak256String}
                            needToSave={false} />
                        <div></div>
                        {keccak256String &&
                            <>
                                Hashes are the same: {(keccak256String === assetInterface.current.info_asset.hash) ? <>yes</> : <>no</>}
                            </>
                        }

                    </div>


                </ModalContent>
            )}

            <div className="textHeader">Asset</div>
            <div className="flex">
                <div className="textStandardBold">Title:</div>
                <div className="mr-3"></div>
                <div className="textStandard">{assetInterface.current.info_asset.title}</div>
            </div>
            <div className="flex">
                <div className="textStandardBold">Hash:</div>
                <div className="mr-3"></div>
                <div className="textStandard">{assetInterface.current.info_asset.hash}</div>
            </div>
            {/* <div>title: {assetInterface.current.info_asset.title}</div>
            <div>hash: {assetInterface.current.info_asset.hash}</div> */}
            <div className="">
                <ButtonStandard
                    buttonName="Verify hash"
                    handleClick={() => setShouldCheckHash(true)}
                />
            </div>

            <div className="textHeader mt-10">Privileged shareholders:</div>
            {assetInterface.current.info_asset.names.map((name, index) => (
                <div className=" mb-5" key={index}>
                    <div className="flex">
                        <div className="textStandardBold">Name:</div>
                        <div className="mr-3"></div>
                        <div className="textStandard">{name}</div>
                    </div>
                    <div className="flex">
                        <div className="textStandardBold">Address:</div>
                        <div className="mr-3"></div>
                        <div className="textStandard">{assetInterface.current?.info_asset?.addresses[index]}</div>
                    </div>
                    <div className="flex">
                        <div className="textStandardBold">Shares:</div>
                        <div className="mr-3"></div>
                        <div className="textStandard">
                            {Number(assetInterface.current?.info_asset?.shares[index])}
                            <div className="textStandard">{(Number(assetInterface.current?.info_asset?.shares[index]) / TOTAL_SUPLY * 100).toFixed(2)}%</div>

                        </div>


                    </div>
                </div>
            ))}
        </>
    )

}