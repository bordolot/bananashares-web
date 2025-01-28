import { ethers } from "ethers";


declare var window: any;

class CustomError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message); // Call the Error constructor with the message
        this.code = code;
        Object.setPrototypeOf(this, CustomError.prototype); // Maintain correct prototype chain
    }
}

// Mock provider simulating MetaMask's behavior
export class MockMetaMaskProvider {
    private wallet: ethers.Wallet; // Simulated MetaMask account
    private provider: ethers.JsonRpcProvider;
    //@TODO create a utility for registering connected websites then remove connected variable
    // connectedWebsites?: string[]; 
    connected: boolean = false;
    private eventListeners: Record<string, ((...args: any[]) => void)[]> = {};
    private currentNetwork: string;
    private validChainIdHex = `0x${parseInt('31337').toString(16)}`;


    constructor(rpcUrl: string, privateKey: string) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl); // Anvil RPC
        this.wallet = new ethers.Wallet(privateKey, this.provider); // Create a wallet
        this.currentNetwork = this.validChainIdHex;
    }

    // Simulate MetaMask's injected window.ethereum
    inject() {
        window.ethereum = {
            // isMetaMask: true,
            // Handle requests (like eth_requestAccounts)
            request: async ({ method, params }: { method: string; params?: any[] }) => {
                if (method === "eth_requestAccounts") {
                    // Return the mock wallet's address
                    //@TODO create a callback simulating acceptance or refusal of website connection
                    // const requestAccepted = wait callback()
                    const requestAccepted: boolean = true;
                    if (requestAccepted) {
                        this.connected = true
                        return [this.wallet.address];
                    }
                    throw new CustomError("Something went wrong", 4001);
                }

                if (method === "eth_accounts") {

                    if (this.connected) {
                        return [this.wallet.address];
                    }
                    return [];
                }
                //@TODO write method to change network
                if (method === "eth_chainId") {
                    return this.currentNetwork;
                }

                //@TODO mock (method === wallet_switchEthereumChain)

                // Mock eth_newFilter
                if (method === "eth_newFilter") {
                    return "0x1";
                }

                // Forward other requests to the Anvil provider
                return this.provider.send(method, params || []);
            },

            // Optional: Simulate event listeners (e.g., accountsChanged, chainChanged)
            on: this.on.bind(this),
            removeAllListeners: this.removeAllListeners.bind(this),
        };
    }

    // Expose the signer for ethers.Contract
    async getSigner() {
        const browserProvider = new ethers.BrowserProvider(window.ethereum as any);
        return browserProvider.getSigner(); // Mimics MetaMask's signer behavior
    }

    // Add an event listener
    on(event: string, listener: (...args: any[]) => void) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(listener);
    }

    // Remove all event listeners or specific event listeners
    removeAllListeners(event?: string) {
        if (event) {
            this.eventListeners[event] = [];
        } else {
            this.eventListeners = {};
        }
    }

    // Trigger an event
    emit(event: string, ...args: any[]) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach((listener) => listener(...args));
        }
    }

    disconnect() {
        this.connected = false
        this.removeAllListeners();
    }

}