import React, { useEffect, useState } from "react";
import ConnectToAsset from "./ConnectToAsset";
import InteractWithAsset from "./InteractWithAsset";

import ConnectWallet from "../../Utilities/ConnectWallet";
import NoWalletDetected from "../../Utilities/NoWallet";
import Spinner from "../../Utilities/Spinner";
import { SPINNER_DURATION } from "../../../utility/Globals";
import { ButtonStandard } from "../../../components_generic/Button";
import { useWallet } from "../../../blockchain/WalletInterface";



const FindAsset: React.FC = () => {
    const [showConnectToAsset, setShowConnectToAsset] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const { provider, userAddress, assetInterface } = useWallet();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, SPINNER_DURATION);
    }, []);



    const back = () => {
        setShowConnectToAsset(true);
    };

    const moveToAsset = () => {
        setShowConnectToAsset(false);
    };

    if (loading) { return <Spinner />; }
    if (provider === null) { return <NoWalletDetected />; }
    if (userAddress === null) { return <ConnectWallet />; }


    if (showConnectToAsset) {
        return (
            <>
                {(assetInterface.current !== null) ?
                    <ButtonStandard buttonName="Current asset" handleClick={moveToAsset} />
                    : <></>
                }
                <ConnectToAsset moveToAsset={moveToAsset} />
            </>
        );
    }
    return (
        <>
            <InteractWithAsset back={back} />
        </>
    );


};

export default FindAsset;
