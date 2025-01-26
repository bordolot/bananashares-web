import { useState } from "react";
import { useWallet } from "../../blockchain/WalletInterface";

export function ConnectButton() {
    const [isConnecting, setIsConnecting] = useState(false);
    const { connectWallet, provider, userAddress, isNetwork, assetFactoryInterface, reload } = useWallet();

    const onConnectButton = async () => {
        if (isConnecting) {
            alert("Your wallet is waiting for action.");
            return;
        }

        setIsConnecting(true);
        try {
            await connectWallet(); // Call the connectWallet function from WalletProvider
        } catch (error) {
            console.error("Error connecting wallet:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    const onCheckButton = () => {
        console.log("onCheckButton");
        // reload();
        // initCreateAssetInterface();
        // console.log("accountsChanged assetFactoryInterface ", assetFactoryInterface.current?.newAssetAddress)
        // console.log(provider);
        // console.log("userAddress:", userAddress);
        // console.log("isNetwork: ", isNetwork);
        // console.log("assetFactoryInterface?.shouldShowAssetCreated: ", assetFactoryInterface?.shouldShowAssetCreated);

        console.log("onCheckButton - END");

    };

    return (
        <div className="mx-auto my-auto">
            <button
                className="w-full py-2 px-6 bg-[#00df9a] rounded-xl text-black hover:bg-[#9ab5df] duration-500"
                onClick={onConnectButton}
            // disabled={isConnecting || connected}
            >
                {userAddress === null ? <>Connect</> : <>{isNetwork ? <>Connected</> : <>Change chain</>}</>}
            </button>

            <button
                className='w-full py-2 px-6 bg-[#00df9a] rounded-xl text-black hover:bg-[#9ab5df] duration-500'
                onClick={() => { onCheckButton() }}>
                check
            </button>

        </div>
    );
}