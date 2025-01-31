import { useWallet } from "../../../../blockchain/WalletInterface";
import { ButtonStandard, ButtonStandardToWallet } from "../../../../components_generic/Button";
import InfoRevealer from "../../../../components_generic/InfoRevealer";
import { TitleValueInOneLine } from "../../../../components_generic/SimpleCompenents";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import { TxArgs_ActivateLicense, TxArgs_SignLicense } from "../../../../utility/Interfaces";


interface LicenseProps {
    isUserPrivileged: boolean;
    hash: string;
    price: number;
    isActive: boolean;
    verifyLicense: () => void
}

export const License: React.FC<LicenseProps> = ({
    isUserPrivileged,
    hash,
    price,
    isActive,
    verifyLicense }) => {
    const { assetInterface } = useWallet();

    async function changeLicenseStatus() {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            const _args: TxArgs_ActivateLicense = {
                licenseHash: hash,
                activate: !isActive,
            };
            const result = await assetInterface.current.activateLicenseTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error)
        }

    }

    async function signLicense() {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            if (!isActive) {
                throw Error("There is no such a license.");
            }
            const _args: TxArgs_SignLicense = {
                licenseHash: hash,
                etherToPay: BigInt(price),
            };
            const result = await assetInterface.current.signLicenseTx(_args);
            if (!result) { throw Error("Transaction failed"); }

        } catch (error: any) {
            alert(error)
        }
    }


    return (
        <div className="bgOffer p-3 rounded-2xl">
            <TitleValueInOneLine
                title={"Price:"}
                distanse={"mr-2"}
                value={<>{(price / WEI_IN_ETHER).toFixed(4)} Ether</>}
            />
            <TitleValueInOneLine
                title={"Hash:"}
                distanse={"mr-2"}
                value={<div className="textStandard break-all max-w-80">{hash}</div>} />
            <div className="flex space-x-5">
                <div className="flex">
                    {isActive &&
                        <InfoRevealer explanation={"Before signing always review the decoded license."} width={70} />

                    }
                    <div className="mr-1"></div>
                    <ButtonStandard
                        handleClick={verifyLicense}
                        buttonName="Verify hash" />
                </div>
                {isActive &&
                    <ButtonStandardToWallet
                        handleClick={signLicense}
                        buttonName="Sign License" />
                }
                {isUserPrivileged
                    &&
                    <ButtonStandardToWallet
                        handleClick={changeLicenseStatus}
                        buttonName={isActive ? "Deactivate" : "Activate"} />
                }

            </div>





        </div>
    );
}