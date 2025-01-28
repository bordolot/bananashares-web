import React, { ChangeEvent, useState } from 'react';
import { keccak256, hexlify, BytesLike } from "ethers";
import InfoRevealer from '../../components_generic/InfoRevealer';


interface FileHasherProps {
    keccak256String: string | null;
    setKeccak256String: React.Dispatch<React.SetStateAction<string | null>>;
    needToSave: boolean;
}

const FileHasher: React.FC<FileHasherProps> = ({ keccak256String, setKeccak256String, needToSave }) => {
    const [base64String, setBase64String] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name.slice(0, -4))
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

    // const handleSaveButtonClick = () => {
    //     if (base64String) {
    //         //@TODO uncomment this in production
    //         const blob = new Blob([base64String], { type: 'text/plain' }); // Assuming the base64 string represents text data
    //         const url = URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = `${fileName}_base64_for_hashing.txt`; // Set the filename here
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         URL.revokeObjectURL(url);
    //         // handleHashButtonClick();
    //         hashIt(base64String)
    //     }
    // };

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
                            explanation='Your manifest file have been encoded into base64 format. This format helps keeping content of your manifest in unchanged state during for example copy/paste between machines. Keep in mind that this encoded file will be hashed and this hash will be saved on blockchain.' />
                        <div className='textStandard'>Read {fileName} as: {base64String.slice(0, 10)}.....</div>

                    </div>
                    <div className="mb-5"></div>

                    {needToSave
                        &&
                        <>
                            <div className='flex mb-1'>
                                <InfoRevealer explanation={'Saves the encoded version of your manifest to your machine. The best practice is to keep one copy of this file in a safe place.\n\n Share both the original file and the hashed version with all interested parties. Both files can be used to confirm the asset\'s hash, but the encoded version is more reliable.\n\nCreates a hash of your manifest that will be saved on the blockchain.'} />
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
                        <InfoRevealer explanation={'The hash can be used to find the address of your asset\'s contract. You can create such a hash yourself using the keccak256 hashing algorithm.'} />
                        <div className='textStandard'>Hash:</div>
                    </div>

                    <div className='items-center'>{keccak256String}</div>
                    {/* <button onClick={handleSaveButtonClick}>Save File</button> */}
                </div>
            )}

        </div>
    );
};

export default FileHasher;
