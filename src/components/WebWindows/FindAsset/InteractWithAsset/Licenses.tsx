import React, { FormEvent, useEffect, useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import { Info_License, TxArgs_PutNewLicense } from "../../../../utility/Interfaces";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { ModalCreateNewLicense } from "../../../Modals/ModalCreateNewLicense";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import Dropdown from "../../../../components_generic/Dropdown";
import { HashVeryfier } from "../../../Utilities/FileHasher";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { License } from "./License";
import { TitleValueInOneLine } from "../../../../components_generic/SimpleCompenents";

interface LicensesProps {
    isUserPrivileged: boolean;
}

export const Licenses: React.FC<LicensesProps> = ({ isUserPrivileged }) => {
    const { userAddress, assetInterface, reloadKey } = useWallet();

    const [shouldShowCreateAgr, setShouldShowCreateAgr] = useState(false);
    const [shouldShowCheckAgr, setShouldCheckAgr] = useState(false);

    const [keccak256String, setKeccak256String] = useState<string | null>(null);
    const [activeLicense, setActiveLicense] = useState<Info_License | null>(null);
    const [activeNotActiveLicense, setNotActiveLicense] = useState<Info_License | null>(null);


    useEffect(() => {
        setActiveLicense(null);
        setNotActiveLicense(null);
    }, [reloadKey]);


    function showNewLicense() {
        setShouldShowCreateAgr(true)
        setKeccak256String(null)
    }

    async function putNewLicense(event: FormEvent<HTMLFormElement>) {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            event.preventDefault();
            event.stopPropagation();

            if (!keccak256String) {
                throw Error("Please upload your license file and generate the hash.");
            }

            const formData = new FormData(event.currentTarget);
            const price = formData.get("price") as unknown as number;

            const uint224Max = 2 ** 224 - 1;
            const price_in_WEI = price * WEI_IN_ETHER
            if (price_in_WEI <= 0 || price_in_WEI > uint224Max) {
                alert("Please correct price.");
                return false;
            }

            const formated_price = BigInt(price_in_WEI)

            const _args: TxArgs_PutNewLicense = {
                licenseHash: keccak256String,
                value: formated_price,
            };
            const result = await assetInterface.current.putNewLicenseTx(_args);
            if (!result) { throw Error("Transaction failed"); }
            setShouldShowCreateAgr(false);
        } catch (error: any) {
            alert(error)
        }

    }

    const handleSelect = (option: Info_License) => {
        setActiveLicense(option)

    };

    const handleDropdownSelect = (option: Info_License) => {
        setNotActiveLicense(option);
    };



    // async function activateLicense() {
    //     try {
    //         if (!assetInterface.current) {
    //             throw Error("There was a problem with Asset contract interface.");
    //         }
    //         if (!activeNotActiveLicense) {
    //             throw Error("Set a proper value to activate the license.");
    //         }
    //         const _args: TxArgs_ActivateLicense = {
    //             licenseHash: activeNotActiveLicense.hash,
    //             activate: true,
    //         };
    //         const result = assetInterface.current.activateLicenseTx(_args);
    //         if (!result) { throw Error("Transaction failed"); }

    //     } catch (error: any) {
    //         alert(error)
    //     }
    // }




    if (!userAddress) {
        return (<>No User address detected. Are you really connected?</>)
    }
    if (!assetInterface.current) {
        return (<>No Asset Interface!!!</>)
    }
    if (!assetInterface.current.info_asset) {
        return (<>Asset info not read.</>)
    }
    return (
        <>
            {/* Upload license modal */}
            {shouldShowCreateAgr && (
                <ModalContent onClose={() => { setShouldShowCreateAgr(false) }}>
                    <Form
                        submitName="Send transaction"
                        handleSubmit={putNewLicense}>
                        <ModalCreateNewLicense
                            keccak256String={keccak256String}
                            setKeccak256String={setKeccak256String} />
                    </Form>
                </ModalContent>
            )}




            <div className="textHeader">Licenses:</div>

            {/* Create new license */}
            {isUserPrivileged
                && assetInterface.current.info_allLicenses &&
                <ButtonStandard
                    handleClick={showNewLicense}
                    buttonName="Upload new license" />
            }

            <div className="mb-10"></div>

            {/* Active Licenses */}
            {(assetInterface.current.info_allLicenses
                && assetInterface.current.info_allLicenses[0].length > 0)
                ?
                <>
                    <div className="flex flex-wrap gap-10">
                        {assetInterface.current.info_allLicenses[0].map((license, index) => (
                            <div className=" mb-5" key={index}>
                                <License
                                    isUserPrivileged={isUserPrivileged}
                                    hash={license.hash}
                                    price={Number(license.value)}
                                    isActive={license.isActive}
                                    verifyLicense={() => { setShouldCheckAgr(true); handleSelect(license) }}
                                />
                            </div>
                        ))}
                    </div>
                </>

                :
                <div className="textStandard">There are no active licenses.</div>}

            {isUserPrivileged
                && assetInterface.current.info_allLicenses &&
                <>
                    {assetInterface.current.info_allLicenses[1].length > 0 &&
                        <>

                            <div className="flex items-center ">
                                <div className="textStandard">Deactivated licenses:</div>
                                <div className="mr-1"></div>
                                <Dropdown<Info_License>
                                    propText="select license"
                                    options={assetInterface.current.info_allLicenses[1]}
                                    onSelect={handleDropdownSelect}
                                    renderOption={(option) => <span>{option.hash}</span>}
                                />


                            </div>

                            {activeNotActiveLicense &&
                                <div>
                                    <License
                                        isUserPrivileged={isUserPrivileged}
                                        hash={activeNotActiveLicense.hash}
                                        price={Number(activeNotActiveLicense.value)}
                                        isActive={activeNotActiveLicense.isActive}
                                        verifyLicense={() => { setShouldCheckAgr(true); handleSelect(activeNotActiveLicense) }}
                                    />
                                    {/* <div>Selected license: {activeNotActiveLicense.hash}</div>
                                    <div>Price: {Number(activeNotActiveLicense.value) / WEI_IN_ETHER} ether</div>
                                    {isUserPrivileged &&
                                        <ButtonStandard
                                            handleClick={activateLicense}
                                            buttonName="Activate" />} */}
                                </div>}
                        </>
                    }

                </>
            }


            {/* Verify license hash */}
            {shouldShowCheckAgr && (
                <ModalContent onClose={() => { setShouldCheckAgr(false); }}>
                    <div>

                        <TitleValueInOneLine
                            title={<div className="textStandardBold whitespace-nowrap">License hash:</div>}
                            distanse={"mr-4"}
                            value={<div className="break-all textStandard">{activeLicense?.hash ?? "No license selected."}</div>} />

                        <div></div>
                        <div className="bgStandard2 p-2 rounded-lg">
                            <div className="textStandard">Upload original(decoded) license:</div>
                            <HashVeryfier
                                trueKeccak256String={activeLicense?.hash ?? "0x"}
                                isFileBase64={false} buttonId={"file-1"} typeOfService={1} />
                        </div>

                        <div className="mb-3"></div>

                        <div className="bgStandard2 p-2 rounded-lg">
                            <div className="textStandard">Upload base64 encoded license:</div>
                            <HashVeryfier
                                trueKeccak256String={activeLicense?.hash ?? "0x"}
                                isFileBase64={true} buttonId={"file-2"} typeOfService={1} />
                        </div>
                    </div>


                </ModalContent>
            )}


        </>
    )
}