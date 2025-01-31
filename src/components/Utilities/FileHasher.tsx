import React, { ChangeEvent, useState } from 'react';
import { keccak256, hexlify, BytesLike } from "ethers";
import InfoRevealer from '../../components_generic/InfoRevealer';


enum typeOfService {
    MANIFEST,
    LICENSE,
}

interface FileHasherProps {
    keccak256String: string | null;
    setKeccak256String: React.Dispatch<React.SetStateAction<string | null>>;
    needToSave: boolean;
    typeOfService: typeOfService;
}

const FileHasher: React.FC<FileHasherProps> = ({ keccak256String, setKeccak256String, needToSave, typeOfService }) => {
    const [base64String, setBase64String] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name)
            readFileAsBase64(file)
                .then((base64) => {
                    setBase64String(base64);
                    if (!needToSave) {
                        hashIt(base64);
                    }
                })
                .catch((error) => {
                    console.error('Error reading file:', error);
                });
        }

    };

    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                const [, base64Data] = base64String.split(';base64,');
                if (base64Data) {
                    resolve(base64Data);
                } else {
                    reject(new Error('Invalid base64 data'));
                }
            };
            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleSaveButtonClick = () => {
        if (base64String) {
            try {
                const blob = new Blob([base64String], { type: 'text/plain' }); // Create a Blob for the base64 string
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');

                a.href = url;
                a.download = `${fileName}_base64_for_hashing.txt`; // Set the filename here
                document.body.appendChild(a);

                // Add a `click` event listener to ensure the download is initiated
                a.addEventListener('click', () => {

                    // Wait briefly to ensure the browser begins processing the download
                    setTimeout(() => {
                        // Perform hashing only after confirming the download initiation
                        hashIt(base64String);
                    }, 100);
                });

                // Trigger the download
                a.click();

                // Clean up
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Failed to save the file:', error);
            }
        }
    };



    const hashIt = (_base64String: string) => {
        const decodedData = window.atob(_base64String);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        const bytesLikeData: BytesLike = hexlify(uint8Array);
        const hashString = keccak256(bytesLikeData);
        setKeccak256String(hashString);
    }

    return (
        <div>
            <div>
                <input
                    type="file"
                    id="file"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <label
                    htmlFor="file"
                    className="btnInteract">
                    Upload File
                </label>
            </div>
            <div className="mb-5"></div>

            {base64String && (
                <div>

                    <div className='flex'>
                        <InfoRevealer
                            explanation='Your file content have been encoded into base64 format. This format helps keeping content in unchanged state during for example copy/paste between machines. Keep in mind that this encoded file will be hashed and this hash will be saved on blockchain.'
                            width={1} />
                        <div className='textStandard'>Read {fileName} as: {base64String.slice(0, 10)}.....</div>

                    </div>
                    <div className="mb-5"></div>

                    {needToSave
                        &&
                        <>
                            <div className='flex mb-1'>
                                <InfoRevealer explanation={<>Saves the encoded version of your file to your machine. The best practice is to keep one copy of this file in a safe place.<br /><br />Share both the original file and the hashed version with all interested parties. Both files can be used to confirm the {typeOfService == 0 ? "asset\'s" : "license"} hash, but the encoded version is more reliable.<br /><br />Creates a hash of your ${typeOfService == 0 ? "manifest" : "license"} that will be saved on the blockchain.</>}
                                    width={1} />



                                <div className='textStandard '>Save this file to generate hash:</div>
                            </div>

                            <button type="button" className="btnInteract" onClick={handleSaveButtonClick}>
                                Save File
                            </button>
                        </>
                    }

                </div>
            )}

            {keccak256String && (
                <div >
                    <div className='flex'>
                        <InfoRevealer explanation={'You can create such a hash yourself using the keccak256 hashing algorithm.'}
                            width={1} />
                        <div className='textStandard'>Hash:</div>
                        <div className="mr-4"></div>
                        <div className='textStandard break-all'>{keccak256String}</div>
                    </div>


                    {/* <button onClick={handleSaveButtonClick}>Save File</button> */}
                </div>
            )}

        </div>
    );
};

interface HashVeryfierProps {
    trueKeccak256String: string;
    isFileBase64: boolean;
    buttonId: string;
    typeOfService?: typeOfService;
}

export const HashVeryfier: React.FC<HashVeryfierProps> = ({ trueKeccak256String, isFileBase64, buttonId, typeOfService }) => {
    const [base64String, setBase64String] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [keccak256String, setKeccak256String] = useState<string | null>(null);


    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name)

            if (isFileBase64) {
                readFileAsText(file)
                    .then((fileContent) => {
                        hashIt(fileContent);
                        setBase64String(fileContent);
                    })
                    .catch((error) => {
                        alert("This file probably is not base64 encoded.")
                        console.error('Error reading file:', error);
                    });
            } else {
                readFileAsBase64(file)
                    .then((base64) => {
                        setBase64String(base64);
                        hashIt(base64);
                    })
                    .catch((error) => {
                        console.error('Error reading file:', error);
                    });
            }
        }
    };


    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                const [, base64Data] = base64String.split(';base64,');
                if (base64Data) {
                    resolve(base64Data);
                } else {
                    reject(new Error('Invalid base64 data'));
                }
            };
            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsDataURL(file);
        });
    };

    const readFileAsText = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileContent = reader.result as string;
                resolve(fileContent);
            };
            reader.onerror = () => {
                reject(reader.error);
            };

            reader.readAsText(file); // Read the file as plain text
        });
    };


    const hashIt = (_base64String: string) => {
        const decodedData = window.atob(_base64String);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; ++i) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        const bytesLikeData: BytesLike = hexlify(uint8Array);
        const hashString = keccak256(bytesLikeData);
        setKeccak256String(hashString);
    }

    return (
        <div>
            <div>
                <input
                    type="file"
                    id={buttonId}
                    onChange={handleFileUpload}
                    // style={{ visibility: 'hidden' }}
                    style={{ display: 'none' }} // Hide the default file input
                />
                <div className='flex'>

                    <label
                        htmlFor={buttonId}
                        className="btnInteract">
                        Upload  File
                    </label>
                </div>

            </div>


            <div className="mb-5"></div>

            {base64String && (
                <div>
                    <div className='textStandard'>Read {fileName} as: {base64String.slice(0, 20)}.....</div>
                    <div className="mb-5"></div>
                </div>
            )}

            {keccak256String && (
                <div >
                    <div className='flex'>
                        <div className='textStandardBold'>Hash:</div>
                        <div className="mr-4"></div>
                        <div className='textStandard break-all'>{keccak256String}</div>
                    </div>
                </div>
            )}


            {keccak256String &&
                <>
                    <div className='flex'>
                        <div className='textStandardBold'>Hashes are the same:</div>
                        <div className="mr-4"></div>
                        {(keccak256String === trueKeccak256String) ?
                            <div className='text-green-600 font-bold text-lg'>YES</div> :
                            <div className='flex'>
                                {(isFileBase64 === true) ?
                                    <>
                                        {
                                            (typeOfService && typeOfService === 1) ?
                                                <InfoRevealer explanation={"Provided license doesn't describe sellected license."} width={1} />
                                                :
                                                <InfoRevealer explanation={"This contract doesn't represent provided manifest."} width={70} />
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            (typeOfService && typeOfService === 1) ?
                                                <InfoRevealer explanation={<>Provided license doesn't describe sellected license.Try uploading the base64 version of the license if it was shared by any privileged shareholder. But before that:<br /><br />1. Contact any privileged shareholder and inform them about this situation.<br /><br /> 2. Decode this file to a readable form (using, for example, free online base64 decoders) and review the license.</>} width={1} />


                                                :
                                                <InfoRevealer explanation={<>This contract doesn't represent the provided manifest. Try uploading the base64 version of the manifest if it was shared by any privileged shareholder. But before that:<br /><br /> 1. Contact any privileged shareholder and inform them about this situation.<br /><br /> 2. Decode this file to a readable form (using, for example, free online base64 decoders) and review the manifest.</>} width={1} />
                                        }
                                    </>


                                }
                                <div className='text-red-600 font-bold text-lg'>NO</div>
                            </div>
                        }
                    </div>
                </>
            }

        </div>
    );
};





export default FileHasher