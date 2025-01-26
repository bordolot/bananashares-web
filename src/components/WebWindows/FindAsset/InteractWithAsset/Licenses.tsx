import React, { FormEvent, useEffect, useState } from "react";
import { ButtonStandard } from "../../../../components_generic/Button";
import { Info_License, TxArgs_ActivateLicense, TxArgs_PutNewLicense, TxArgs_SignLicense } from "../../../../utility/Interfaces";
import ModalContent from "../../../Modals/Modal";
import Form from "../../../../components_generic/Form";
import { ModalCreateNewLicense } from "../../../Modals/ModalCreateNewLicense";
import { WEI_IN_ETHER } from "../../../../utility/Globals";
import Dropdown from "../../../../components_generic/Dropdown";
import FileHasher from "../../../Utilities/FileHasher";
import { useWallet } from "../../../../blockchain/WalletInterface";
import { checkIfUserIsPrivileged } from "../../../../blockchain/utilities/commonMethods";

export const Licenses: React.FC = () => {
    const { userAddress, assetInterface, reloadKey } = useWallet();

    const [shouldShowCreateAgr, setShouldShowCreateAgr] = useState(false);
    const [shouldShowCheckAgr, setShouldCheckAgr] = useState(false);
    const [keccak256StringAgr, setKeccak256StringAgr] = useState<string | null>(null);
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
        if (option.isActive) {
            setActiveLicense(option)
        } else {
            setNotActiveLicense(option)
        }

    };

    async function deactivateLicense() {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            if (!activeLicense) {
                throw Error("Set a proper value to deactivate the license.");
            }
            const _args: TxArgs_ActivateLicense = {
                licenseHash: activeLicense.hash,
                activate: false,
            };
            const result = await assetInterface.current.activateLicenseTx(_args);
            if (!result) { throw Error("Transaction failed"); }
        } catch (error: any) {
            alert(error)
        }

    }

    async function activateLicense() {
        try {
            if (!assetInterface.current) {
                throw Error("There was a problem with Asset contract interface.");
            }
            if (!activeNotActiveLicense) {
                throw Error("Set a proper value to activate the license.");
            }
            const _args: TxArgs_ActivateLicense = {
                licenseHash: activeNotActiveLicense.hash,
                activate: true,
            };
            const result = assetInterface.current.activateLicenseTx(_args);
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
            if (!activeLicense) {
                throw Error("There is no such a license.");
            }
            const _args: TxArgs_SignLicense = {
                licenseHash: activeLicense.hash,
                etherToPay: activeLicense.value,
            };
            const result = await assetInterface.current.signLicenseTx(_args);
            if (!result) { throw Error("Transaction failed"); }

        } catch (error: any) {
            alert(error)
        }
    }


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
                        submitName="submit"
                        handleSubmit={putNewLicense}>
                        <ModalCreateNewLicense
                            keccak256String={keccak256String}
                            setKeccak256String={setKeccak256String} />
                    </Form>
                </ModalContent>
            )}




            <h4 className="my-1 text-3xl">Asset licenses:</h4>
            {(assetInterface.current.info_allLicenses && assetInterface.current.info_allLicenses[0].length > 0)
                ?
                <>
                    {assetInterface.current.info_allLicenses[0].length > 0 &&
                        <>
                            <>Here you have active licenses:</>
                            <Dropdown<Info_License>
                                options={assetInterface.current.info_allLicenses[0]}
                                onSelect={handleSelect}
                                renderOption={(option) => <span>{option.hash}</span>}
                            />
                        </>
                    }


                    {activeLicense &&
                        <div>
                            <div>Selected license: {activeLicense.hash}</div>
                            <div>Price: {Number(activeLicense.value) / WEI_IN_ETHER} ether</div>
                            {checkIfUserIsPrivileged(userAddress, assetInterface.current.info_asset) &&
                                <ButtonStandard
                                    handleClick={deactivateLicense}
                                    buttonName="Deactivate" />}
                            <ButtonStandard
                                handleClick={signLicense}
                                buttonName="Sign License" />

                            <ButtonStandard
                                buttonName="Check License"
                                handleClick={() => setShouldCheckAgr(true)}
                            />

                            {shouldShowCheckAgr && (
                                <ModalContent onClose={() => { setShouldCheckAgr(false); setKeccak256StringAgr(null) }}>
                                    {/* {children} */}
                                    <div>
                                        Agr hash: {activeLicense.hash}

                                        <h1 className="my-4 text-xl">
                                            Upload license file:
                                        </h1>
                                        <div></div>
                                        <FileHasher
                                            keccak256String={keccak256StringAgr}
                                            setKeccak256String={setKeccak256StringAgr}
                                            needToSave={false} />
                                        <div></div>
                                        {keccak256StringAgr &&
                                            <>
                                                Hashes are the same: {(keccak256StringAgr === activeLicense.hash) ? <>yes</> : <>no</>}
                                            </>
                                        }

                                    </div>


                                </ModalContent>
                            )}



                        </div>}



                </>

                :
                <>There are no active licenses.</>}

            {checkIfUserIsPrivileged(userAddress, assetInterface.current.info_asset) && assetInterface.current.info_allLicenses &&
                <>
                    {assetInterface.current.info_allLicenses[1].length > 0 &&
                        <>
                            <div></div>
                            <>Here you have not active licenses:</>
                            <Dropdown<Info_License>
                                options={assetInterface.current.info_allLicenses[1]}
                                onSelect={handleSelect}
                                renderOption={(option) => <span>{option.hash}</span>}
                            />
                            {activeNotActiveLicense &&
                                <div>
                                    <div>Selected license: {activeNotActiveLicense.hash}</div>
                                    <div>Price: {Number(activeNotActiveLicense.value) / WEI_IN_ETHER} ether</div>
                                    {checkIfUserIsPrivileged(userAddress, assetInterface.current.info_asset) &&
                                        <ButtonStandard
                                            handleClick={activateLicense}
                                            buttonName="Activate" />}
                                </div>}
                        </>
                    }
                    <ButtonStandard
                        handleClick={showNewLicense}
                        buttonName="Upload new license" />
                </>
            }

        </>
    )
}