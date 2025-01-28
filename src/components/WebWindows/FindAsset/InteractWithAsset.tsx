import { ButtonStandardArrowLeft } from "../../../components_generic/Button";
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
            <div className="py-4">
                <ButtonStandardArrowLeft buttonName={"Find new asset"} handleClick={back} />
            </div>

            {/* InteractWithAsset */}
            <div className="p-6 min-h-screen">
                {/* Asset info */}

                <AssetInfoComponent />

                {/* Licenses */}
                <div className="mb-4"></div>
                <Licenses />

                {/* User info */}
                <div className="mb-10"></div>
                {checkIfUserIsPrivileged(assetInterface.current.info_user.userAddress, assetInterface.current.info_asset)
                    ?
                    <>
                        {/* Privileged User */}
                        <div className="textHeader">You have aditional options:</div>
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
                <div className="my-10"></div>
                <div className="textHeader">All offers:</div>
                <Offers />




            </div>

        </>
    )
}

export default InteractWithAsset