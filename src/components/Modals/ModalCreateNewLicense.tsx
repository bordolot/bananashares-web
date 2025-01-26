import React from "react";
import FileHasher from "../Utilities/FileHasher";

interface CreateNewLicenseProps {
    keccak256String: string | null;
    setKeccak256String: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ModalCreateNewLicense({ keccak256String, setKeccak256String }: CreateNewLicenseProps) {


    return (<>
        <h4 className="my-1 text-3xl">Create new license:</h4>
        <div>Specify the price in your license:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0.05"
            step="0.01"
            name="price"
            placeholder="price in ether"
            required />
        <div className="my-4" />
        <div>Upload your license:</div>
        <FileHasher
            keccak256String={keccak256String}
            setKeccak256String={setKeccak256String}
            needToSave={false} />
        <div></div>
    </>)
}