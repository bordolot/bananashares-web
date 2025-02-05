import { useState } from "react";
import { useWallet } from "../../blockchain/WalletInterface";
import { ERROR_NO_METAMASK } from "../../utility/errors";
import { ALLERT_INFO_WALLET_WATINNG, ALLERT_ON_ERROR_NO_METAMASK, ALLERT_ON_ERROR_UNEXPECTED } from "../../utility/allerts";

export function ConnectButton() {
    const [isConnecting, setIsConnecting] = useState(false);
    const { connectWallet, provider, userAddress, isNetwork, assetFactoryInterface, reload } = useWallet();

    const onConnectButton = async () => {
        if (isConnecting) {
            alert(ALLERT_INFO_WALLET_WATINNG);
            return;
        }
        setIsConnecting(true);
        try {
            if (typeof window.ethereum === 'undefined') {
                throw new ERROR_NO_METAMASK;
            }
            await connectWallet(); // Call the connectWallet function from WalletProvider
        } catch (error: any) {
            if (error instanceof ERROR_NO_METAMASK) {
                alert(ALLERT_ON_ERROR_NO_METAMASK);
            } else {
                alert(ALLERT_ON_ERROR_UNEXPECTED);
                console.error('Unexpected error in onConnectButton: ', error);
            }
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
                className="btnSendtransaction"
                onClick={onConnectButton}
            // disabled={isConnecting || connected}
            >
                {userAddress === null ? <>Connect</> : <>{isNetwork ? <>Connected</> : <>Change chain</>}</>}
            </button>

            {/* <button
                className='w-full py-2 px-6 bg-[#00df9a] rounded-xl text-black hover:bg-[#9ab5df] duration-500'
                onClick={() => { onCheckButton() }}>
                check
            </button> */}

        </div>
    );
}