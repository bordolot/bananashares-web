import { ButtonStandard } from "../../../components_generic/Button";
import { useWallet } from "../../../blockchain/WalletInterface";
import { AssetInfoComponent } from "./InteractWithAsset/AssetInfoComponent";
import { useEffect } from "react";
import { Licenses } from "./InteractWithAsset/Licenses";
import { checkIfUserIsPrivileged } from "../../../blockchain/utilities/commonMethods";
import { OptionsForPrivilegedUser } from "./InteractWithAsset/OptionsForPrivilegedUser";
import { OptionsForUser } from "./InteractWithAsset/OptionsForUser";
import { Offers } from "./InteractWithAsset/Offers";


interface InteractWithAssetProps {
    back: () => void;
}


const InteractWithAsset: React.FC<InteractWithAssetProps> = ({ back }) => {
    const { reloadKey, assetInterface } = useWallet();

    useEffect(() => {

    }, [reloadKey]);


    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_user) {
        return (<>Asset info "info_user" not read.</>)
    }
    if (!assetInterface.current.info_asset) {
        return (<>Asset info "info_asset" not read.</>)
    }

    return (
        <>
            <ButtonStandard buttonName={"Find new asset"} handleClick={back} />
            {/* InteractWithAsset */}

            {/* Asset info */}
            <AssetInfoComponent />

            {/* Licenses */}
            <div className="my-4"></div>
            <Licenses />

            {/* User info */}
            <div className="my-4"></div>
            {checkIfUserIsPrivileged(assetInterface.current.info_user.userAddress, assetInterface.current.info_asset)
                ?
                <>
                    {/* Privileged User */}
                    <h4 className="my-1 text-3xl">You have aditional options:</h4>
                    <OptionsForPrivilegedUser />
                </>
                :
                <>
                    {/* Normal User */}
                    <>
                        <OptionsForUser />
                    </>
                </>
            }

            {/* Offers */}
            <div className="my-4"></div>
            <h4 className="my-1 text-3xl">All offers:</h4>
            <Offers />
        </>
    )
}

export default InteractWithAsset