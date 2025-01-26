import { Eip1193Provider, BrowserProvider, JsonRpcProvider } from "ethers";

declare global {
    interface Window {
        ethereum: Eip1193Provider & BrowserProvider & JsonRpcProvider;
    }
}

export { };