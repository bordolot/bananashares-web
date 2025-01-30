import { useState, FormEvent, ChangeEvent } from "react";
import { ethers } from "ethers";
import { useWallet } from "../../../blockchain/WalletInterface";
import FileHasher from "../../Utilities/FileHasher";
import { TxArgs_CreatAsset } from "../../../utility/Interfaces";
import InfoRevealer from "../../../components_generic/InfoRevealer";


interface Share {
    id: number;
    name: string;
    address: string;
    share: number;
}


enum keys {
    name = "name",
    address = "address",
    share = "share",
}


export function TokenizeAsset() {
    const MAX_SHARES = 1_000_000;
    const { assetFactoryInterface } = useWallet();
    const [shares, setShares] = useState<Share[]>([{ id: 1, name: "", address: "", share: 0 }]);
    const [unusedShares, setUnusedShares] = useState<number>(MAX_SHARES);
    const [keccak256String, setKeccak256String] = useState<string | null>(null);



    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const names: string[] = getShareObjects(keys.name);
        const addresses: string[] = getShareObjects(keys.address);
        const givenShares: number[] = getShareObjects(keys.share);


        if (unusedShares != 0) {
            alert("You need to alocate exactly 1000000 shares.");
            return;
        }



        //@TODO addresses cannot have duplicates

        for (let i = 0; i < addresses.length; i++) {
            const addr = addresses[i]
            const isSmartContractAddress = /^0x[0-9a-fA-F]{40}$/.test(addr);
            if (!isSmartContractAddress) {
                alert("Please enter a proper 20 bytes address format.");
                return;
            }
        }

        //@TODO in produnction uncomment and add try catch error and allert 
        // const checksummedAddresses: string[] = addresses.map(addr => ethers.getAddress(addr));
        // const checksummedAddresses: string[] = [addresses[0], ...addresses.slice(1).map(addr => ethers.Wallet.createRandom().address)];
        const checksummedAddresses: string[] = toChecksummedAddresses(addresses);

        //@TODO delete this line and uncomment 
        setKeccak256String("0x2cd9bf92c5e20b1b410f5ace94d963a96e89156fbe65b70365e8596b37f1f164");
        if (keccak256String == null) {
            alert("You need to upload your audio file, generate hash and save encoded file.");
            return;
        } else {
            if (!/^0x[0-9a-fA-F]{64}$/.test(keccak256String)) {
                alert("Something went wrong with uploading your audio file so hash has wrong format. Please restart application or use different audio file.");
                return;
            }
        }

        const uint24Max = 2 ** 24 - 1;
        const formattedShares: bigint[] = givenShares
            .filter(share => {
                if (share < 0 || share > uint24Max) {
                    alert("Please correct shares.");
                    return false;
                }
                return true;
            })
            .map(share => BigInt(share));

        if (title && names && addresses && formattedShares && keccak256String && assetFactoryInterface.current !== null) {
            const args: TxArgs_CreatAsset = {
                title: title,
                names: names,
                addresses: checksummedAddresses,
                shares: formattedShares,
                hash: keccak256String
            };
            assetFactoryInterface.current.creatAsset(args);
        }

    };

    function toChecksummedAddresses(addresses: string[]): string[] {
        return addresses.map(addr => {
            try {
                return ethers.getAddress(addr); // Validate and checksum the address
            } catch (error) {
                throw new Error(`Invalid Ethereum address: ${addr}`);
            }
        });
    }


    const addNewShareholderForm = () => {
        setShares([...shares, { id: shares.length + 1, name: "", address: "", share: 0 }]);
    };

    const removeLastShareholderForm = () => {
        if (shares.length > 1) {
            setShares(prevShares => {
                const updatedShares = prevShares.slice(0, -1); // Remove last element
                const newValue = calculateUnusedShares(updatedShares, MAX_SHARES);
                setUnusedShares(newValue); // Update unused shares
                return updatedShares;
            });
        }
    };

    const handleSharesChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setShares(prevShares => {
            const updatedShares = updateShares(prevShares, index, name, value);
            const newValue = calculateUnusedShares(updatedShares, MAX_SHARES);
            setUnusedShares(newValue);
            return updatedShares;
        });
    };

    const updateShares = (shares: Share[], index: number, name: string, value: string | number): Share[] => {
        return shares.map((share, i) =>
            i === index
                ? {
                    ...share,
                    [name]: name.startsWith(`${keys.share}`) ? parseInt(value as string) || 0 : value,
                }
                : share
        );
    };

    const calculateUnusedShares = (shares: Share[], maxShares: number): number => {
        return shares.reduce((remainingShares, share) => {
            const key = `${keys.share}`;
            const value = share[key as keyof Share];
            if (typeof value === "number") {
                return remainingShares - value;
            }
            return remainingShares;
        }, maxShares);
    };

    function getShareObjects(input: keys.name): string[];
    function getShareObjects(input: keys.address): string[];
    function getShareObjects(input: keys.share): number[];
    function getShareObjects(input: keys.name | keys.address | keys.share): string[] | number[] | undefined {
        const resultA: string[] = [];
        const resultB: number[] = [];

        // Ensure `shares` is typed correctly
        for (let i = 0; i < shares.length; i++) {
            const key = `${input}`;

            // Dynamically access the key with proper typing
            const shareObject = shares[i] as Record<string, any>; // Assuming shares[i] is a generic object
            const value = shareObject[key];

            switch (input) {
                case keys.address:
                case keys.name:
                    if (typeof value === 'string') {
                        resultA.push(value);
                    }
                    break; // Prevent fall-through
                case keys.share:
                    if (typeof value === 'number') {
                        resultB.push(value);
                    }
                    break;
            }
        }

        switch (input) {
            case keys.address:
            case keys.name:
                return resultA;
            case keys.share:
                return resultB;
        }
    }

    return (
        <div className="m-10">
            {
                assetFactoryInterface.current !== null && assetFactoryInterface.current.newAssetAddress !== undefined ?
                    <>
                        Your last created asset's address: {assetFactoryInterface.current.newAssetAddress}
                    </>
                    :
                    <></>
            }
            <div className="textHeader">Tokenize your asset</div>
            <form onSubmit={handleSubmit}>
                <div className="textStandardBold">Asset title:</div>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="title"
                    placeholder="title"
                    required
                />

                <div className="mb-5"></div>
                <div className="mb-6">
                    <h1 className="textStandardBold">Privileged shareholders:</h1>
                    <div className="flex flex-col space-y-4">
                        {shares.map((share, index) => (
                            <div key={share.id} className="flex flex-col space-y-2">
                                <div className="flex">
                                    <div className="flex items-center mr-2">{share.id}.</div>
                                    <div className="flex space-x-4">
                                        <input
                                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name={`${keys.name}`}
                                            placeholder="First and last name"
                                            onChange={handleSharesChange(index)}
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="flex space-x-4">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-w-30"
                                        type="text"
                                        name={`${keys.address}`}
                                        placeholder="wallet address - 0x0000000000000000000000000000000000000000"
                                        onChange={handleSharesChange(index)}
                                        required
                                    />
                                    <input
                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        min={0}
                                        max={MAX_SHARES}
                                        name={`${keys.share}`}
                                        placeholder="Number of shares"
                                        defaultValue={0}
                                        onChange={handleSharesChange(index)}
                                        required
                                    />
                                    <div className="flex items-center">{(
                                        shares[index].share / MAX_SHARES * 100).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div >
                    <span className="text-lg">Shares to be allocated: {unusedShares}</span>
                </div>

                {/* getShareObjects(keys.share)[index] */}


                <div className="flex space-x-2 my-2">
                    <button
                        className={
                            `${(shares.length >= 10 || unusedShares <= 0)
                                ? 'btnInteractBlocked'
                                : 'btnInteract'}`}
                        type="button"
                        onClick={addNewShareholderForm}
                        disabled={(shares.length >= 10 || unusedShares <= 0)}>
                        New Shareholder
                    </button>
                    <button
                        className={
                            `${shares.length <= 1
                                ? 'btnInteractBlocked'
                                : 'btnInteractRed'}`}
                        type="button"
                        onClick={removeLastShareholderForm}
                        disabled={shares.length <= 1}>
                        Remove Shareholder
                    </button>
                </div>
                <div className="mb-10"></div>


                {/* <h1 className="my-4 text-xl">
                            Upload asset manifest:
                        </h1> */}
                <div className="flex mb-1">
                    <InfoRevealer
                        explanation={`The Manifest is a foundational document that describes the asset, the owner's rights, and how the asset will be managed within this protocol. It defines the rules and conditions under which the asset is governed and outlines the responsibilities and entitlements of the owner(s). Think of it as a digital contract that ensures transparency and clarity. \n\n Please provide this file in the most simple format such as .txt or similar.`}
                    />
                    <div className="textStandard">Upload asset manifest:</div>
                </div>


                <FileHasher
                    keccak256String={keccak256String}
                    setKeccak256String={setKeccak256String}
                    needToSave={true} typeOfService={0} />
                <div></div>
                <div className="mb-15"></div>

                <div className="">
                    <input
                        className="btnSendtransaction"
                        type="submit"
                        value="Tokenize"
                    />
                </div>

            </form>

        </div>
    );

}

