import { FormEvent } from "react";
import { useWallet } from "../../../blockchain/WalletInterface";
import { ALLERT_ON_ERROR_UNEXPECTED } from "../../../utility/allerts";

interface ConnectToAssetProps {
    moveToAsset: () => void;
}

const ConnectToAsset: React.FC<ConnectToAssetProps> = ({ moveToAsset }) => {
    const { createAssetInterface, assetFactoryInterface, assetInterface, userAddress } = useWallet();
    const tryToConnectToAsset = async (_input: string, _addrORhash: number) => {
        try {
            if (!assetFactoryInterface.current) {
                alert("There was a problem with AssetFactory contract connection."); return;
            }
            // _addrORhash == 1 => by address
            // _addrORhash == 2 => by hash
            let _contractAddress;
            let _result;
            if (_addrORhash === 1) {
                _result = await assetFactoryInterface.current.checkAssetExist(_input);
                _contractAddress = _input;
            } else if (_addrORhash === 2) {
                _result = await assetFactoryInterface.current.checkAssetExistByHash(_input);
                _contractAddress = _result.contractAddress;
            } else {
                alert("Wrong input."); return;
            }

            if (!_result.assetExist) {
                alert("Asset contract doesn't exist."); return;
            }

            const _isInterfaceCreated = createAssetInterface(_contractAddress);
            if (!_isInterfaceCreated) {
                alert("There was a problem connecting Asset contract."); return;
            }
            if (!assetInterface.current) {
                alert("There was a problem with Asset contract interface."); return;
            }

            const _infoTaken_1 = await assetInterface.current.getAssetInfo();
            const _infoTaken_2 = await assetInterface.current.getLicensesInfo();
            const _infoTaken_3 = await assetInterface.current.getUserInfo(userAddress);
            const _infoTaken_4 = await assetInterface.current.getUserOffer(userAddress);
            const _infoTaken_5 = await assetInterface.current.getAllOffers();


            if (!_infoTaken_1 && !_infoTaken_2 && !_infoTaken_3 && !_infoTaken_4 && !_infoTaken_5) {
                alert("There was a problem gathering Asset info."); return;
            }
            moveToAsset();
            return;

        } catch (error: any) {
            alert(ALLERT_ON_ERROR_UNEXPECTED)
            console.error(error)
        }
    };

    const tryToConnectToAssetByAddress = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const _formData = new FormData(event.currentTarget);
            const _potentialAssetAddress = _formData.get("PotentialAssetAddress") as string;
            const _isSmartContractAddress = /^0x[0-9a-fA-F]{40}$/.test(_potentialAssetAddress);
            if (!_isSmartContractAddress) {
                alert("Wrong address format. Please enter a proper 20 bytes address."); return;
            }
            await tryToConnectToAsset(_potentialAssetAddress, 1);
        } catch (error: any) {
            alert(ALLERT_ON_ERROR_UNEXPECTED)
            console.error(error)
        }
    }

    const tryToConnectToAssetByHash = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const _formData = new FormData(event.currentTarget);
            const _potentialAssetHash = _formData.get("PotentialAssetHash") as string;
            const _isSmartContractHash = /^0x[0-9a-fA-F]{64}$/.test(_potentialAssetHash);
            if (!_isSmartContractHash) {
                alert("Wrong hash format. Please enter a proper 32 bytes hash."); return;
            }
            await tryToConnectToAsset(_potentialAssetHash, 2);
        } catch (error: any) {
            alert(ALLERT_ON_ERROR_UNEXPECTED)
            console.error(error)
        }
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="container mx-auto">
                <div className="textHeader">Connect to your asset</div>
                <form onSubmit={tryToConnectToAssetByAddress}>
                    <div className="mb-6">
                        <div className="textStandard">By asset address:</div>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="PotentialAssetAddress"
                            placeholder="0x0000000000000000000000000000000000000000"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="btnInteract"
                            type="submit"
                            value="Try to connect"
                        />
                    </div>
                </form>

                <form onSubmit={tryToConnectToAssetByHash}>
                    <div className="mb-6">
                        <div className="textStandard">By asset hash:</div>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="PotentialAssetHash"
                            placeholder="0x0000000000000000000000000000000000000000000000000000000000000000"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="btnInteract"
                            type="submit"
                            value="Try to connect"
                        />
                    </div>
                </form>




            </div>
        </div>
    );
};

export default ConnectToAsset;