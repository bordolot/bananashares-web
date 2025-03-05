
import { ethers } from "ethers"


import { ContractInterface } from "./utilities/ContractInterface";
import addresses from "./contracts/addresses.json";
// import createAssetAbi from "./contracts/IAssetFactory.json";
import createAssetAbi from "./contracts/AssetFactory.json";

import { saveToFile } from "./utilities/commonMethods";
import { GAS_LIMIT_IN_CREATE_ASSET } from "../utility/Globals";
import { TxArgs_CreatAsset } from "../utility/Interfaces";

export class AssetFactoryInterface extends ContractInterface {
    protected walletOwnerAddress: string | null;
    shouldShowAssetCreatedModal: boolean = false;
    newAssetAddress: string | undefined;
    protocolDeploymentBlockNr: number = 0;
    currentBlockNr: number = 0;

    constructor(_provider: ethers.BrowserProvider, _walletOwnerAddress: string | null, callTheOwner: () => void) {
        // Call the parent class constructor with arguments
        super(addresses.AssetFactory, createAssetAbi.abi, _provider, callTheOwner);
        this.walletOwnerAddress = _walletOwnerAddress;

        if (this.contract !== undefined) {
            this._intializeAssetFactoryListeners(this.contract);
        }
        console.log("AssetFactoryInterface instance CREATED");
    }

    async checkProtocolDeploymentBlockNr(): Promise<{ infoTaken: boolean }> {
        if (!this.contract) return { infoTaken: false }
        try {
            this.protocolDeploymentBlockNr = await this.contract.getProtocolDeploymentBlockNr();
            this.currentBlockNr = await this.provider.getBlockNumber();
            return { infoTaken: true }

        } catch (error: any) {
            console.warn("checkAssetExist error: ", error);
            return { infoTaken: false }
        }
    }

    //@TODO
    async checkAssetExist(_assetAddr: string): Promise<{ assetExist: boolean }> {
        if (!this.contract) return { assetExist: false }
        try {
            const assetHash = await this.contract.getAssetInstanceHashByAddress(_assetAddr);
            if (assetHash != 0) {
                return { assetExist: true }
            }
            return { assetExist: false }
        } catch (error: any) {
            console.warn("checkAssetExist error: ", error);
            return { assetExist: false }
        }
    }

    async checkAssetExistByHash(_assetHash: string): Promise<{ assetExist: boolean, contractAddress: string }> {
        if (!this.contract) return { assetExist: false, contractAddress: "0x" }
        try {
            const assetAddr = await this.contract.getAssetInstanceByHash(_assetHash);
            if (assetAddr != "") {
                return { assetExist: true, contractAddress: assetAddr }
            }
            return { assetExist: false, contractAddress: "0x" }
        } catch (error: any) {
            console.warn("checkAssetExist error: ", error);
            return { assetExist: false, contractAddress: "0x" }
        }
    }


    async creatAsset(args: TxArgs_CreatAsset): Promise<void> {
        await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.createSong(
                args.title,
                args.names,
                args.addresses,
                args.shares,
                args.hash,
                {
                    gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                }
            );
            this.txBeingSent = tx.hash;
        });
    }

    private _intializeAssetFactoryListeners(_contract: ethers.Contract) {


        _contract.on("AssetInstanceCreated", (assetCreator, assetAddress, nameOfAsset, event) => {

            event;
            // @TODO add any info or allert with this info for users
            // console.log(`Song Created!!!!`);
            // console.log(`Song name => ${nameOfAsset}`);
            // console.log(`Song address => ${assetAddress}`);
            // console.log(`Song assetCreator => ${assetCreator}`);
            if (this.walletOwnerAddress) {
                if (this.walletOwnerAddress.toLowerCase() == assetCreator.toLowerCase()) {


                    const content = `Song address: ${assetAddress}`
                    saveToFile(`${nameOfAsset}_address.txt`, content)


                    this.shouldShowAssetCreatedModal = true;
                    this.newAssetAddress = assetAddress;
                    this.callTheOwner();
                }
            }

        })

        _contract.on("AssetInstanceCreationFailure", (assetCreator, reason, event) => {
            event;
            console.log(`Song AssetInstanceCreationFailure!!!!`);
            console.log(`Song assetCreator => ${assetCreator}`);
            console.log(`Song reason => ${reason}`);
        })

    }


}