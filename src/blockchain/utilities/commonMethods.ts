import { Info_Asset, Info_RegularOffer } from "../../utility/Interfaces"

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
