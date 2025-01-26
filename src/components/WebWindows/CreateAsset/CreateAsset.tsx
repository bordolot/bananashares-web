import React, { useEffect, useState } from "react";



import ConnectWallet from "../../Utilities/ConnectWallet";
import NoWalletDetected from "../../Utilities/NoWallet";
import Spinner from "../../Utilities/Spinner";
import ModalContent from "../../Modals/Modal";
import { useWallet } from "../../../blockchain/WalletInterface";
import { TokenizeAsset } from "./TokenizeAsset";
import { SPINNER_DURATION } from "../../../utility/Globals";





interface CreateAssetProps {

}

export const CreateAsset: React.FC<CreateAssetProps> = () => {
    const [loading, setLoading] = useState(true);
    const { provider, userAddress, reloadKey, assetFactoryInterface } = useWallet();

    const [shouldShowAssetCreated, setShouldShowAssetCreated] = useState<boolean>(false);
    const [newAssetCreatedAddress, setNewAssetCreatedAddress] = useState<string | undefined>();

    // Simulate checking wallet connection and loading state
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, SPINNER_DURATION);
    }, []);

    useEffect(() => {
        // console.log("START CreateAsset reload called; reloadKey: ", reloadKey);

        if (assetFactoryInterface.current !== null && assetFactoryInterface.current.shouldShowAssetCreatedModal) {
            setNewAssetCreatedAddress(assetFactoryInterface.current.newAssetAddress);
            setShouldShowAssetCreated(assetFactoryInterface.current.shouldShowAssetCreatedModal);
        }
    }, [reloadKey]);

    const closeModal = () => {
        setShouldShowAssetCreated(false);
        if (assetFactoryInterface.current !== null) {
            assetFactoryInterface.current.shouldShowAssetCreatedModal = false;
        }
    }

    if (loading) { return <Spinner />; }
    if (provider === null) { return <NoWalletDetected />; }
    if (userAddress === null) { return <ConnectWallet />; }
    return (
        <>
            {shouldShowAssetCreated && (
                <>
                    <ModalContent onClose={closeModal}>
                        <>
                            <div>You succesfully tokenized your asset.</div>
                            <div>The address of your asset is: {newAssetCreatedAddress}</div>
                            <div>This address has been saved to your computer.</div>
                            <div>Now you can sell shares in your asset.</div>
                            <div>To do so, open the 'Find Asset' window and paste the address of your asset.</div>
                            <div>Share your asset's address with others so anyone can buy your shares.</div>
                        </>
                    </ModalContent>
                </>

            )}

            <TokenizeAsset />

        </>
    );
};