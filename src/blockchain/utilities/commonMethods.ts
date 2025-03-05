import { Info_Asset, Info_RegularOffer } from "../../utility/Interfaces"

import {
    EARLY_PERIOD,
    FIRST_DIVISOR,
    SECOND_DIVISOR,
    TOTAL_SUPLY,
    GOV_TOKEN_DECIMALS,
    WITHDRAW_LOCK_PERIOD,
    BLOCKS_PER_DAY
} from "../../utility/Globals";

export const saveToFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export function checkIfUserIsPrivileged(userAddress: string | undefined, info_asset: Info_Asset): boolean {
    if (userAddress) {
        const normalizedA = userAddress.toLowerCase();
        const normalizedB = info_asset.addresses.map(address => address.toLowerCase());
        return normalizedB.includes(normalizedA);
    }
    return false;
}

export function sortOffersByValuePerShare(offers: Info_RegularOffer[]): Info_RegularOffer[] {
    return offers.sort((a, b) => a.valuePerShare - b.valuePerShare);
}

export function getSharesFromSongInfo(privilegedAddress: string, songInfo: Info_Asset): number {
    let result: number = 0;
    const normalizedPrivilegedAddress = privilegedAddress.toLowerCase();
    const index = songInfo.addresses.findIndex(address => address.toLowerCase() === normalizedPrivilegedAddress);
    if (index !== -1) {
        result = Number(songInfo.shares[index]);
    }
    return result;
}

export function getNumberOfGovTokensToMintInAsset(
    _currentBlock: number,
    _deployBlock: number,
    _availableToMint: number,
    _alreadyMinted: number): [number, number] {
    const _availableToMint_0 = _availableToMint / GOV_TOKEN_DECIMALS;
    const _alreadyMinted_0 = _alreadyMinted / GOV_TOKEN_DECIMALS;
    let _govTokenLimit = 0;
    let _divisor = 0;
    if (_currentBlock > EARLY_PERIOD + _deployBlock) {
        _divisor = SECOND_DIVISOR;
    } else {
        _divisor = FIRST_DIVISOR;
    }
    _govTokenLimit = TOTAL_SUPLY / _divisor;
    if (_availableToMint_0 == 0) {
        return [0, _divisor];
    }
    if (_govTokenLimit <= _alreadyMinted_0) {
        return [0, _divisor];
    }
    if ((_govTokenLimit - _alreadyMinted_0) <= _availableToMint_0) {
        return [_govTokenLimit - _alreadyMinted_0, _divisor];
    }
    return [_availableToMint_0, _divisor];

}

export function checkIfEtherIsLocked(
    _currentNetworkBlock: number,
    _savedBlock: number): boolean {
    if (_currentNetworkBlock > _savedBlock + WITHDRAW_LOCK_PERIOD) {
        return false;
    }
    return true;
}

export function getLockPeriod(
    _currentNetworkBlock: number,
    _savedBlock: number): number {
    return Math.ceil(((_savedBlock + WITHDRAW_LOCK_PERIOD) - _currentNetworkBlock) / BLOCKS_PER_DAY);
}
