import { FormEvent } from "react";
import { useWallet } from "../../../blockchain/WalletInterface";

interface ConnectToAssetProps {
    moveToAsset: () => void;
}

const ConnectToAsset: React.FC<ConnectToAssetProps> = ({ moveToAsset }) => {
    const { createAssetInterface, assetFactoryInterface, assetInterface, userAddress } = useWallet();
    const tryToConnectToAsset = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const _formData = new FormData(event.currentTarget);
            const _potentialAssetAddress = _formData.get("PotentialAssetAddress") as string;
            const _isSmartContractAddress = /^0x[0-9a-fA-F]{40}$/.test(_potentialAssetAddress);

            if (!_isSmartContractAddress) {
                throw Error("Wrong address format. Please enter a proper 20 bytes address.");
            }

            if (!assetFactoryInterface.current) {
                throw Error("There was a problem with AssetFactory contract connection.");
            }

            const _result = await assetFactoryInterface.current.checkAssetExist(_potentialAssetAddress);
            if (!_result.assetExist) {
                throw Error("Asset contract doesn't exist.")
            }

            const _isInterfaceCreated = createAssetInterface(_potentialAssetAddress);
            if (!_isInterfaceCreated) {
                throw Error("There was a problem connecting Asset contract.");
            }
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }

            const _infoTaken_1 = await assetInterface.current.getAssetInfo();
            const _infoTaken_2 = await assetInterface.current.getLicensesInfo();
            const _infoTaken_3 = await assetInterface.current.getUserInfo(userAddress);
            const _infoTaken_4 = await assetInterface.current.getUserOffer(userAddress);
            const _infoTaken_5 = await assetInterface.current.getAllOffers();


            if (!_infoTaken_1 && !_infoTaken_2 && !_infoTaken_3 && !_infoTaken_4 && !_infoTaken_5) {
                throw Error("There was a problem gathering Asset info.");
            }
            moveToAsset();
            return;

        } catch (error: any) {
            alert(error)
        }
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <h4 className="text-3xl font-bold mb-6">Connect to your asset</h4>
                <form onSubmit={tryToConnectToAsset}>
                    <div className="mb-6">
                        <div className="block mb-2 text-lg font-semibold">Asset address:</div>
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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