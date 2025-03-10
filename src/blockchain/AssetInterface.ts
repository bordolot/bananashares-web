import { ethers } from "ethers"

import { ContractInterface } from "./utilities/ContractInterface";
// import assetAbi from "./contracts/IAssetInstance.json";
import assetAbi from "./contracts/AssetInstance.json";
import { TxArgs_BuyShares, TxArgs_CancelOffer, TxArgs_ChangeOffer, TxArgs_MakeSellOffer, TxArgs_PayEarndFeesToAllPrivileged, TxArgs_Withdraw } from "../utility/Interfaces";
import { TxArgs_PutNewLicense, TxArgs_ActivateLicense, TxArgs_SignLicense, TxArgs_PayDividend } from "../utility/Interfaces";
import { Info_Asset, Info_License, Info_RegularOffer, Info_User, Info_UserOffer } from "../utility/Interfaces";

import { GAS_LIMIT_IN_PAY_DIVIDEND_BASE, GAS_LIMIT_IN_PAY_DIVIDEND_PER_ITERATION, TOTAL_SUPLY, WAIT_BEFORE_UPDATE } from "../utility/Globals";
import { checkIfUserIsPrivileged, sortOffersByValuePerShare } from "./utilities/commonMethods";

export class AssetInterface extends ContractInterface {

    info_asset: Info_Asset | undefined;
    info_allLicenses: [Info_License[], Info_License[]] | undefined;
    info_user: Info_User | undefined;
    info_userOffer: Info_UserOffer | undefined;
    info_allOffers: Info_RegularOffer[] | undefined;

    isCurrentUserPrivileged: boolean = false;

    private isDuringExecution_updateLicenses: boolean = false;
    private wasCalledDuringExecution_updateLicenses: boolean = false;
    private debounceTimeout_updateLicenses: NodeJS.Timeout | null = null;

    private isDuringExecution_updateOffers: boolean = false;
    private wasCalledDuringExecution_updateOffers: boolean = false;
    private debounceTimeout_updateOffers: NodeJS.Timeout | null = null;


    constructor(
        _provider: ethers.BrowserProvider,
        _providerForEvents: ethers.WebSocketProvider,
        _assetAddr: string,
        callTheOwner: () => void) {
        // Call the parent class constructor with arguments
        super(_assetAddr, assetAbi.abi, _provider, _providerForEvents, callTheOwner);
    }

    async init(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (this.contractForEvents !== undefined) {
                await this._intializeAssetListeners(this.contractForEvents);
            } else {
                reject(false)
            }
            resolve(true);
        });
    }

    //@TODO
    async getAssetInfo(): Promise<{ infoTaken: boolean }> {
        if (!this.contract) return { infoTaken: false }
        try {
            const newInfo: Info_Asset = {
                title: "",
                names: [],
                addresses: [],
                shares: [],
                theRestShares: 0,
                hash: "",
                govTokensMinted: 0
            };

            newInfo.title = await this.contract.getNameOfAsset();
            const result_1 = await this.contract.getAllAuthors();
            newInfo.names = result_1.map(([name]: [string, any]) => name);
            const result_2 = await this.contract.getAllPrivShareholders();
            newInfo.addresses = result_2.slice(1);
            let totalShares = TOTAL_SUPLY;
            for (let i = 0; i < newInfo.addresses.length; i++) {
                newInfo.shares[i] = await this.contract.getShares(newInfo.addresses[i]);
                totalShares -= Number(newInfo.shares[i]);
            }
            newInfo.theRestShares = totalShares;
            newInfo.hash = await this.contract.getAssetHash();
            this.info_asset = newInfo;
            newInfo.govTokensMinted = Number(await this.contract.getGovTokensMinted());
            return { infoTaken: true }

        } catch (error: any) {
            console.warn("getAssetInfo error: ", error);
            return { infoTaken: false }
        }
    }

    async getLicensesInfo(): Promise<{ infoTaken: boolean }> {
        if (!this.contract) return { infoTaken: false };
        try {
            const newActiveLicensesArray: Info_License[] = [];
            const newNotActiveLicensesArray: Info_License[] = [];

            const result_1 = await this.contract.getLicensesLength()
            if (result_1 != 0) {
                let object: any;
                for (let i = 1; i <= result_1; i++) {
                    object = await this.contract.getLicense(i)
                    const license: Info_License = {
                        hash: object[0],
                        value: object[1],
                        isActive: object[2],
                    }
                    if (license.isActive == true) {
                        newActiveLicensesArray.push(license)
                    } else { newNotActiveLicensesArray.push(license) }
                }
            }
            const newLicensesArray: [Info_License[], Info_License[]] = [newActiveLicensesArray, newNotActiveLicensesArray];
            this.info_allLicenses = newLicensesArray;
            return { infoTaken: true };

        } catch (error: any) {
            console.warn("getLicensesInfo error: ", error);
            return { infoTaken: false }
        }
    }

    async getUserInfo(_userAddress: string | null): Promise<{ infoTaken: boolean }> {
        if (!this.contract || !_userAddress) return { infoTaken: false };
        try {
            const newInfo: Info_User = {
                userAddress: _userAddress,
                isThereAnyDividend: false,
                dividend: BigInt(0),
                howManyPayments: BigInt(0),
                isThereAnyFees: false,
                fees: BigInt(0),
                isThereAnyEther: false,
                ether: BigInt(0),
                lastBlockGovTokenMinted: BigInt(0)
            }

            const result_0 = await this.contract.getShares(_userAddress)
            if (Number(result_0) != 0) {
                const result_1 = await this.contract.getDividendToPay(_userAddress);
                newInfo.dividend = BigInt(result_1[0]);
                newInfo.howManyPayments = BigInt(result_1[1]);
                if (newInfo.howManyPayments > 0) {
                    newInfo.isThereAnyDividend = true;
                }
                const result_2 = BigInt(await this.contract.getPrivilegedFees(_userAddress))
                if (result_2 > 0) {
                    newInfo.isThereAnyFees = true;
                    newInfo.fees = result_2;
                }
            }
            const result_3 = await this.contract.getBalance(_userAddress);
            const result_4 = await this.contract.getLastBlockGovTokenMinted(_userAddress);
            if (result_3 > 0) {
                newInfo.isThereAnyEther = true;
                newInfo.ether = result_3;
                newInfo.lastBlockGovTokenMinted = result_4;
            }

            this.info_user = newInfo;
            if (this.info_asset) {
                this.isCurrentUserPrivileged = checkIfUserIsPrivileged(newInfo.userAddress, this.info_asset);
            }
            return { infoTaken: true };
        } catch (error: any) {
            console.warn("getUserInfo error: ", error);
            return { infoTaken: false };
        }
    }



    async getUserOffer(_userAddress: string | null): Promise<{ infoTaken: boolean }> {
        if (!this.contract || !_userAddress) return { infoTaken: false };
        try {
            const newOffer: Info_UserOffer = {
                amount: 0,
                valuePerShare: 0
            }
            const result_1 = await this.contract.getOffersIndex(_userAddress)
            if (result_1 != 0) {
                const result_2 = await this.contract.getOffer(result_1)
                newOffer.amount = Number(result_2[4])
                newOffer.valuePerShare = Number(result_2[1] + result_2[2] + result_2[3])
            }
            this.info_userOffer = newOffer;
            return { infoTaken: true };
        } catch (error: any) {
            console.warn("getUserOffer error: ", error);
            return { infoTaken: false };
        }

    }


    async getAllOffers(): Promise<{ infoTaken: boolean }> {
        if (!this.contract || !this.info_asset) return { infoTaken: false };
        try {

            const result_1 = await this.contract.getOffersLength()
            let offers: Info_RegularOffer[] = [];

            let _isPrivileged: boolean = false;
            let _isThereAnyFees: boolean = false;
            // only privlileged can have fees to collect
            const result_2 = Number(await this.contract.getPrivilegedFees(this.info_asset.addresses[0]));

            let _isThereAnyDividend: boolean;
            let _howMany: bigint;
            let result_1_1;
            if (result_1 != 0) {
                let object: any;
                for (let i = 1; i <= result_1; i++) {
                    object = await this.contract.getOffer(i);
                    _isPrivileged = checkIfUserIsPrivileged(object[0], this.info_asset);
                    if (_isPrivileged && result_2 > 0) {
                        _isThereAnyFees = true;
                    } else {
                        _isThereAnyFees = false;
                    }
                    result_1_1 = await this.contract.getDividendToPay(object[0]);
                    _howMany = result_1_1[1];
                    _isThereAnyDividend = false;
                    if (_howMany > 0) {
                        _isThereAnyDividend = true;
                    }
                    const offer: Info_RegularOffer = {
                        id: i,
                        addressFrom: object[0],
                        amount: Number(object[4]),
                        valuePerShare: Number(object[1] + object[2] + object[3]),
                        isThereAnyDividend: _isThereAnyDividend,
                        howManyPayments: Number(_howMany),
                        isThereAnyFees: _isThereAnyFees
                    }
                    offers.push(offer);
                }
            }
            this.info_allOffers = sortOffersByValuePerShare(offers);
            return { infoTaken: true };

        } catch (error: any) {
            console.warn("getAllOffers error: ", error);
            return { infoTaken: false };
        }

    }

    async makeSellOfferTx(args: TxArgs_MakeSellOffer): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            console.log(`AssetInterface makeSellOfferTx ${args.amount} `, args.amount, args.newPrice)
            const tx = await this.signer.makeSellOffer(
                args.amount,
                args.newPrice,
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async cancelOfferTx(args: TxArgs_CancelOffer): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            args;
            const tx = await this.signer.cancelOffer(
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async buySharesTx(args: TxArgs_BuyShares): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.buyShares(
                args.addressFrom,
                args.amount,
                args.sellLimit, {
                value: args.etherToPay.toString() // Correctly set value in wei
            }
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async payEarndFeesToAllPrivilegedTx(args: TxArgs_PayEarndFeesToAllPrivileged): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            args;
            const tx = await this.signer.payEarndFeesToAllPrivileged(
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async withdrawTx(args: TxArgs_Withdraw): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.withdraw(
                args.amount,
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }
    async changeOfferTx(args: TxArgs_ChangeOffer): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.changeOffer(
                args.newLimit,
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async putNewLicenseTx(args: TxArgs_PutNewLicense): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.putNewLicense(
                args.licenseHash,
                args.value,
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async activateLicenseTx(args: TxArgs_ActivateLicense): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.activateLicense(
                args.licenseHash,
                args.activate,
                // {
                //     gasLimit: BigInt(GAS_LIMIT_IN_CREATE_ASSET)
                // }
            );
            this.txBeingSent = tx.hash;
        });
    }


    async signLicenseTx(args: TxArgs_SignLicense): Promise<boolean> {
        return this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer");
            }
            const tx = await this.signer.signLicense(
                args.licenseHash,
                {
                    value: args.etherToPay.toString()
                }
            );
            this.txBeingSent = tx.hash;
        });
    }

    async payDividendTx(args: TxArgs_PayDividend): Promise<boolean> {
        return await this.sendTransaction(async () => {
            if (this.signer == undefined) {
                throw new Error("Wrong Signer")
            }
            const tx = await this.signer.payDividend(
                args.address,
                {
                    gasLimit: BigInt(GAS_LIMIT_IN_PAY_DIVIDEND_BASE + Number(args.howManyPayments) * GAS_LIMIT_IN_PAY_DIVIDEND_PER_ITERATION)
                }
            );
            this.txBeingSent = tx.hash;
        });
    }

    //
    // EVENT LISTERNERS
    //

    async removeListeners() {
        await this.contractForEvents?.removeAllListeners()
    }

    private _updateOffers = async () => {
        if (this.isDuringExecution_updateOffers) {
            this.wasCalledDuringExecution_updateOffers = true;
            return;
        }
        this.isDuringExecution_updateOffers = true;
        await new Promise(resolve => setTimeout(resolve, WAIT_BEFORE_UPDATE));
        try {

            await this.getAssetInfo();
            if (this.info_user) {
                await this.getUserInfo(this.info_user.userAddress);
                await this.getUserOffer(this.info_user.userAddress);
            }
            await this.getAllOffers();
            this.callTheOwner();

            if (this.wasCalledDuringExecution_updateOffers) {
                this.wasCalledDuringExecution_updateOffers = false;
                // Delay the next call of foo to avoid excessive recursion
                if (this.debounceTimeout_updateOffers) clearTimeout(this.debounceTimeout_updateOffers);
                this.debounceTimeout_updateOffers = setTimeout(() => {
                    this._updateOffers();
                }, 0); // You can adjust the debounce time if necessary
            }
        } finally {
            this.isDuringExecution_updateOffers = false;
        }
    }

    private _updateLicenses = async () => {
        if (this.isDuringExecution_updateLicenses) {
            this.wasCalledDuringExecution_updateLicenses = true;
            return;
        }
        this.isDuringExecution_updateLicenses = true;
        await new Promise(resolve => setTimeout(resolve, WAIT_BEFORE_UPDATE));
        try {
            await this.getLicensesInfo();
            this.callTheOwner();

            if (this.wasCalledDuringExecution_updateLicenses) {
                this.wasCalledDuringExecution_updateLicenses = false;
                // Delay the next call of foo to avoid excessive recursion
                if (this.debounceTimeout_updateLicenses) clearTimeout(this.debounceTimeout_updateLicenses);
                this.debounceTimeout_updateLicenses = setTimeout(() => {
                    this._updateLicenses();
                }, 0); // You can adjust the debounce time if necessary
            }
        } finally {
            this.isDuringExecution_updateLicenses = false;
        }
    }


    private async _intializeAssetListeners(_contract: ethers.Contract) {
        _contract.on("SellOfferPut", async (from, amount, value,) => {
            //@TODO add any info or allert with this info for users
            console.log(`Offer created!!!!`);
            console.log(`from => ${from}, amount => ${amount}, value => ${value}`);
            await this._updateOffers();
        })

        _contract.on("OfferCancelled", async (from) => {
            //@TODO add any info or allert with this info for users
            console.log(`Offer cancelled!!!!`);
            console.log(`from => ${from}`);
            await this._updateOffers();
        })
        _contract.on("SharesBought", async (from, value, to, amount) => {
            //@TODO add any info or allert with this info for users
            console.log(`Shares Bought!!!!`);
            console.log(`from => ${to} from => ${from} amount => ${amount} value => ${value} `);
            await this._updateOffers();
        })

        _contract.on("OfferChanged", async (from, value) => {
            //@TODO add any info or allert with this info for users
            console.log(`OfferChanged!!!!`);
            console.log(` from => ${from}  value => ${value} `);

            await this._updateOffers();
        })


        _contract.on("Withdrawal", async (user, amount) => {
            console.log(`Withdrawal !!!!`);
            console.log(`user => ${user} amount => ${amount}`);
            //@TODO find out why this condition is false while in real life shpuld be true
            // console.log(user.toLowerCase())
            if (this.info_user?.userAddress.toLowerCase() == user.toLowerCase()) {
                await this._updateOffers();
            }
        })

        _contract.on("NewLicenseCreated", async (creator,) => {
            //@TODO add any info or allert with this info for users
            console.log(`NewLicenseCreated !!!!`);
            console.log(`creator => ${creator}`);
            await this._updateLicenses();
        })

        _contract.on("LicenseDeactivated", async (remover, licenseHash,) => {
            //@TODO add any info or allert with this info for users
            console.log(`LicenseDeactivated !!!!`);
            console.log(`remover => ${remover} licenseHash => ${licenseHash}`);
            await this._updateLicenses();
        })
        _contract.on("LicenseActivated", async (activator, licenseHash,) => {
            //@TODO add any info or allert with this info for users
            console.log(`LicenseActivated !!!!`);
            console.log(`activator => ${activator} licenseHash => ${licenseHash}`);
            await this._updateLicenses();
        })

        _contract.on("NewPayment", async (payer, licenseHash,) => {
            //@TODO add any info or allert with this info for users
            console.log(`NewPayment !!!!`);
            console.log(`payer => ${payer} licenseHash => ${licenseHash}`);
            await this._updateOffers();
        })


        _contract.on("EarndFeesToAllPrivileged", async (value,) => {
            //@TODO add any info or allert with this info for users
            console.log(`EarndFeesToAllPrivileged !!!!`);
            console.log(`value => ${value}`);
            await this._updateOffers();
        })

        _contract.on("DividendPaid", async (holder, value, numberOfPayments,) => {
            //@TODO add any info or allert with this info for users
            console.log(`DividendPaid !!!!`);
            console.log(`holder => ${holder} value => ${value} numberOfPayments => ${numberOfPayments}`);
            await this._updateOffers();
        })

        _contract.on("DividendPaidOnlyPartly", async (holder, value, numberOfPaymentsLeft,) => {
            //@TODO add any info or allert with this info for users
            console.log(`DividendPaidOnlyPartly !!!!`);
            console.log(`holder => ${holder} value => ${value} numberOfPaymentsLeft => ${numberOfPaymentsLeft}`);
            await this._updateOffers();
        })

        //@TODO comment it in production
        _contract.on("GasUsage", async (gas,) => {
            console.log(`--------`);
            console.log(`GasUsage => ${gas} `);
            await this._updateOffers();
        })

    }

}