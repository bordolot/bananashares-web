import React, { ChangeEvent, useState } from 'react';
import { keccak256, hexlify, BytesLike } from "ethers";

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

    const handleSaveButtonClick = () => {
        if (base64String) {
            //@TODO uncomment this in production
            const blob = new Blob([base64String], { type: 'text/plain' }); // Assuming the base64 string represents text data
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}_base64_for_hashing.txt`; // Set the filename here
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            // handleHashButtonClick();
            hashIt(base64String)
        }
    };

    /*
    @notice handleHashButtonClick assumes that base64String is base64 encoded string. 
            Docodes this string to ASCII encoded string. 
            Next each character firstly is converted to its decimal and finaly hex-decimal representation.
            And this hex-decimal representation of this base64 encoded string is then hashed and saved as 
                keccak256String.
    @param no params
    */
    // const handleHashButtonClick = () => {
    //     if (base64String) {
    //         const decodedData = window.atob(base64String);
    //         const uint8Array = new Uint8Array(decodedData.length);
    //         for (let i = 0; i < decodedData.length; ++i) {
    //             uint8Array[i] = decodedData.charCodeAt(i);
    //         }
    //         const bytesLikeData: BytesLike = hexlify(uint8Array);
    //         const hashString = keccak256(bytesLikeData);
    //         setKeccak256String(hashString);
    //     }
    // }

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
                    className={`font-bold py-1 px-3 rounded bg-[#ca873a] hover:bg-[#ca6f3a] text-white`}>
                    Upload File
                </label>
            </div>

            {base64String && (
                <div>
                    <h2>Read {fileName} as: {base64String.slice(0, 10)}.....</h2>
                    {needToSave
                        &&
                        <>
                            <div>Save this file to generate hash</div>
                            <button type="button" className={`font-bold py-1 px-3 rounded bg-[#ca873a] hover:bg-[#ca6f3a] text-white`} onClick={handleSaveButtonClick}>
                                Save File
                            </button>
                        </>
                    }

                </div>
            )}

            {keccak256String && (
                <div>
                    <h2>Hash:</h2>
                    <pre>{keccak256String}</pre>
                    {/* <button onClick={handleSaveButtonClick}>Save File</button> */}
                </div>
            )}

        </div>
    );
};

export default FileHasher;
