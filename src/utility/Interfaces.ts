// CreateAsset contract
// TX ARGS
export interface TxArgs_CreatAsset {
    title: string;
    names: string[];
    addresses: string[];
    shares: BigInt[];
    hash: string;
}

// Asset contract
// GETTERS
export interface Info_Asset {
    title: string;
    names: string[];
    addresses: string[];
    shares: BigInt[];
    theRestShares: number;
    hash: string;
}

export interface Info_License {
    hash: string;
    value: bigint;
    isActive: boolean;
}

export interface Info_User {
    userAddress: string;
    isThereAnyDividend: boolean;
    dividend: bigint;
    howManyPayments: bigint;
    isThereAnyFees: boolean;
    fees: bigint;
    isThereAnyEther: boolean;
    ether: bigint;
}

export interface Info_UserOffer {
    amount: number;
    valuePerShare: number;
}

export interface Info_RegularOffer {
    id: number;
    addressFrom: string;
    amount: number;
    valuePerShare: number;
    isThereAnyDividend: boolean;
    howManyPayments: number;
    isThereAnyFees: boolean;
}

// TX ARGS

export interface TxArgs_MakeSellOffer {
    amount: BigInt;
    newPrice: BigInt;
}

export interface TxArgs_CancelOffer {
}

export interface TxArgs_BuyShares {
    addressFrom: string;
    amount: BigInt;
    sellLimit: BigInt;
    etherToPay: BigInt;
}

export interface TxArgs_PayEarndFeesToAllPrivileged {
}

export interface TxArgs_Withdraw {
    amount: BigInt;
}

export interface TxArgs_ChangeOffer {
    newLimit: BigInt;
}

export interface TxArgs_PutNewLicense {
    licenseHash: string;
    value: BigInt;
}

export interface TxArgs_ActivateLicense {
    licenseHash: string;
    activate: boolean;
}

export interface TxArgs_SignLicense {
    licenseHash: string;
    etherToPay: BigInt;
}

export interface TxArgs_PayDividend {
    address: string;
    howManyPayments: BigInt;
}

