
import { ethers } from "ethers"


import { ContractInterface } from "./utilities/ContractInterface";
import addresses from "./contracts/addresses.json";
import tokenAbi from "./contracts/IBananasharesToken.json";


export class TokenInterface extends ContractInterface {
    protected walletOwnerAddress: string | null;

    availableToMint: number = 0;

    constructor(
        _provider: ethers.BrowserProvider,
        _providerForEvents: ethers.WebSocketProvider,
        _walletOwnerAddress: string | null,
        callTheOwner: () => void) {
        // Call the parent class constructor with arguments
        super(addresses.BananaSharesToken, tokenAbi.abi, _provider, _providerForEvents, callTheOwner);
        this.walletOwnerAddress = _walletOwnerAddress;
        this.checkAvailableToMint();
        if (this.contractForEvents !== undefined) {
            this._intializeAssetListeners(this.contractForEvents);
        }
        console.log("TokenInterface instance CREATED");
    }

    async checkAvailableToMint(): Promise<{ infoTaken: boolean }> {
        if (!this.contract) return { infoTaken: false }
        try {
            this.availableToMint = await this.contract.getAvailableToMint();
            return { infoTaken: true }
        } catch (error: any) {
            console.warn("checkAvailableToMint error: ", error);
            return { infoTaken: false }
        }
    }

    private async _intializeAssetListeners(_contract: ethers.Contract) {
        _contract.removeAllListeners();
        _contract.on("TokenMinted", async () => {
            await this.checkAvailableToMint();
        })
    }



}