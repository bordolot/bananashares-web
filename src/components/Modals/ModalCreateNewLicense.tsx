import React from "react";
import FileHasher from "../Utilities/FileHasher";
import InfoRevealer from "../../components_generic/InfoRevealer";

interface CreateNewLicenseProps {
    keccak256String: string | null;
    setKeccak256String: React.Dispatch<React.SetStateAction<string | null>>;
}

export function ModalCreateNewLicense({ keccak256String, setKeccak256String }: CreateNewLicenseProps) {


    return (<>
        <div className="min-w-110">
            <div className="textStandard">Specify the price in Ether in your license:</div>
            <div className="flex">
                <InfoRevealer explanation={'This price should represent the price specified in the license text file.'} />
                <div className="mr-3"></div>
                <input
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    min="0.05"
                    step="0.01"
                    name="price"
                    placeholder="price in ether"
                    required />
                <div className="my-4" />
            </div>




            <div className="mb-5"></div>

            <div className="flex">
                <InfoRevealer explanation={'A license is a file that must contain the price in Ether and an explanation of what the payee is paying for.'} />
                <div className="mr-3"></div>
                <div className="textStandard">Upload your license:</div>
            </div>
            <FileHasher
                keccak256String={keccak256String}
                setKeccak256String={setKeccak256String}
                needToSave={true} typeOfService={1} />
            <div className="mb-10"></div>

        </div>


    </>)
}