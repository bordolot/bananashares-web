import { ethers, Interface, InterfaceAbi } from "ethers"

import { ERROR_CODE_TX_REJECTED_BY_USER } from "../utilities/ErrorCodes";

export class ContractInterface {

    protected contract: ethers.Contract | undefined;
    protected signer: ethers.Contract | undefined;

    protected transactionError: string | undefined;
    protected txBeingSent: string | undefined;

    constructor(_address: string, _abi: Interface | InterfaceAbi, _provider: ethers.BrowserProvider, callTheOwner: () => void) {
        this.contract = new ethers.Contract(_address, _abi, _provider);
        this.callTheOwner = callTheOwner;
        _provider.getSigner(0).then((_signer: ethers.JsonRpcSigner) => {
            this.signer = new ethers.Contract(_address, _abi, _signer)
        }).catch(error => {
            console.error("Error checking wallet connection:", error);
        });
    }

    destroy() {
        // Cleanup resources
        console.log("ContractInterface instance destroyed");
    }

    protected async sendTransaction(transactionLogic: () => Promise<void>): Promise<boolean> {
        try {
            this._dismissTransactionError();
            await transactionLogic();
            return true; // Transaction succeeded
        } catch (error) {
            if ((error as any).code === ERROR_CODE_TX_REJECTED_BY_USER) {
                console.warn("Transaction rejected by the user");
                return false;
            }
            console.error(error);
            this.transactionError = (error as any).code;
            return false; // Transaction failed
        } finally {
            this.txBeingSent = undefined;
        }
    }

    private _dismissTransactionError = () => {
        this.transactionError = undefined;
    }

    // @dev
    // Triggers a function in a React component that implements this class.
    // The primary purpose is to reload the state in the component when a variable in this class is about to change.
    // For example, you can implement this in the component:
    // ```
    // const [reloadKey, setReloadKey] = useState(0);
    // const reload = useCallback(() => {
    //     setReloadKey((prevKey) => prevKey + 1);
    // }, []);
    // const _provider = new ethers.BrowserProvider(window.ethereum);
    // const _walletAddress = 0x1234...
    // const assetFactoryInterface = new AssetFactoryInterface(_provider, _walletAddress, reload)
    // ```
    // Then, pass the function to the constructor.
    protected callTheOwner: () => void;


}