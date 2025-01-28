
import { ethers } from "ethers"


import { ContractInterface } from "./utilities/ContractInterface";
import addresses from "./contracts/addresses.json";
import createAssetAbi from "./contracts/CreateAssetAbi.json";

import { saveToFile } from "./utilities/commonMethods";
import { GAS_LIMIT_IN_CREATE_ASSET } from "../utility/Globals";
import { TxArgs_CreatAsset } from "../utility/Interfaces";

export class AssetFactoryInterface extends ContractInterface {
    protected walletOwnerAddress: string | null;
    shouldShowAssetCreatedModal: boolean = false;
    newAssetAddress: string | undefined;

    constructor(_provider: ethers.BrowserProvider, _walletOwnerAddress: string | null, callTheOwner: () => void) {
        // Call the parent class constructor with arguments
        super(addresses.AssetFactory, createAssetAbi.abi, _provider, callTheOwner);
        this.walletOwnerAddress = _walletOwnerAddress;

        if (this.contract !== undefined) {
            this._intializeSongsMarketplaceListeners(this.contract);
        }
        console.log("AssetFactoryInterface instance CREATED");
    }

    //@TODO
    async checkAssetExist(_assetAddr: string): Promise<{ assetExist: boolean }> {
        if (!this.contract) return { assetExist: false }
        try {
            const assetName = await this.contract.getSongByAddress(_assetAddr);
            if (assetName != "") {
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
            const assetAddr = await this.contract.getSongByHash(_assetHash);
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

    private _intializeSongsMarketplaceListeners(_contract: ethers.Contract) {

        _contract.on("SongCreated", (songCreator, songAddress, nameOfSong, event) => {
            event;
            // @TODO add any info or allert with this info for users
            // console.log(`Song Created!!!!`);
            // console.log(`Song name => ${nameOfSong}`);
            // console.log(`Song address => ${songAddress}`);
            // console.log(`Song songCreator => ${songCreator}`);
            if (this.walletOwnerAddress) {
                if (this.walletOwnerAddress.toLowerCase() == songCreator.toLowerCase()) {


                    const content = `Song address: ${songAddress}`
                    saveToFile(`${nameOfSong}_address.txt`, content)

                    this.shouldShowAssetCreatedModal = true;
                    this.newAssetAddress = songAddress;
                    this.callTheOwner();
                }
            }

        })

        _contract.on("ContractCreationFailure", (songCreator, reason, event) => {
            event;
            console.log(`Song ContractCreationFailure!!!!`);
            console.log(`Song songCreator => ${songCreator}`);
            console.log(`Song reason => ${reason}`);
        })

    }


}