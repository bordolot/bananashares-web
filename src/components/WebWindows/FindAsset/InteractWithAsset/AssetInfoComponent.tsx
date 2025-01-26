import React, { useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import ModalContent from "../../../Modals/Modal";
import FileHasher from "../../../Utilities/FileHasher";
import { useWallet } from "../../../../blockchain/WalletInterface";




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


            <h4 className="my-1 text-3xl">Song:</h4>
            <div>title: {assetInterface.current.info_asset.title}</div>
            <div>hash: {assetInterface.current.info_asset.hash}</div>
            <ButtonStandard
                buttonName="check hash"
                handleClick={() => setShouldCheckHash(true)}
            />

            {assetInterface.current.info_asset.names.map((name, index) => (
                <div key={index}>
                    <div>Name: {name}</div>
                    <div>Address: {assetInterface.current?.info_asset?.addresses[index]}</div>
                    <div>Share: {Number(assetInterface.current?.info_asset?.shares[index])}</div>
                </div>
            ))}
        </>
    )

}