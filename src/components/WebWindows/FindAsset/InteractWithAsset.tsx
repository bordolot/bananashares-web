import { ButtonStandardArrowLeft } from "../../../components_generic/Button";
import { useWallet } from "../../../blockchain/WalletInterface";
import { AssetInfoComponent } from "./InteractWithAsset/AssetInfoComponent";
import { useEffect } from "react";
import { Licenses } from "./InteractWithAsset/Licenses";
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
            <div className="my-7">
                <ButtonStandardArrowLeft buttonName={"Find new asset"} handleClick={back} />
            </div>

            {/* InteractWithAsset */}
            <div className="m-10">
                {/* Asset info */}

                <AssetInfoComponent />

                {/* Licenses */}
                <div className="mb-4"></div>
                <Licenses isUserPrivileged={assetInterface.current.isCurrentUserPrivileged} />

                {/* User info */}
                <div className="mb-10"></div>
                {assetInterface.current.isCurrentUserPrivileged
                    ?
                    <>
                        {/* Privileged User */}
                        <div className="relative w-full">
                            <div className="textHeader">You have aditional options:</div>
                            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></div>
                        </div>
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

                <div className="relative w-full">
                    <div className="textHeader">All offers:</div>
                    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></div>
                </div>
                <Offers />




            </div>

        </>
    )
}

export default InteractWithAsset