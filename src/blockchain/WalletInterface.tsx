import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { Alerts_WalletInterface } from './Alerts/Alerts';
import { AssetFactoryInterface } from './AssetFactoryInterface';
import { TokenInterface } from './TokenInterface';
import { AssetInterface } from './AssetInterface';
import { ALLERT_ON_ERROR_UNEXPECTED } from '../utility/allerts';


// const NETWORK_ID = '31337'; // in hex 0x7A69; Anvil
const NETWORK_ID = '11155420'; // Optimism Sepolia 

// @todo setup AWS proxy gateway
const part1 = 'dzRy';
const part2 = 'c2d0';
const part3 = 'c0s5';
const part4 = 'OnNz';
const part5 = 'L2di';
const part6 = 'Lzhp';
const part7 = 'bzEx';
const part8 = 'cDBw';
const part9 = 'dEZW';
const part10 = 'LWRj';
const part11 = 'c3p4';
const part12 = 'ZWRj';
const part13 = 'cDV0';
const part14 = 'b21q';
const part15 = 'bGdn';
const part16 = 'aTRy';
const part17 = 'YW44';
const part18 = 'LmRj';
const part19 = 'Z2Nk';
const part20 = 'LjM1';
const part21 = 'YW5u';
const part22 = 'bHN4';
const part23 = 'YzJ3';
const part24 = 'aDV0';
const part25 = 'ZTM0';
const part26 = 'bWtp';
const part27 = 'eXZm';
const part28 = 'LmF6';
const part29 = 'YzRy';
const part30 = 'bzc3';
const part31 = 'bU5I';
const part32 = 'L3Ez';
const part33 = 'dmVy';
const part34 = 'MkND';
const part35 = 'L1RH';
const part36 = "QXNyTVQ3aHhQdDlEcHg0bUh6R041SThtZ2pxZ2NCLVc=";


const result1 = [part1, part2, part3, part4, part5, part6, part7, part8, part9, part10, part11, part12, part13, part14, part15, part16, part17, part18, part19, part20, part21, part22, part23, part24, part25, part26, part27, part28, part29, part30, part31, part32, part33, part34, part35]
    .map(part => {
        // Ensure the string is Base64 valid by padding it to the correct length
        const paddedPart = part.padEnd(part.length + (4 - (part.length % 4)) % 4, '=');
        try {
            // Decode the Base64 string after ensuring it's properly padded
            return atob(paddedPart).slice(0, -2);
        } catch (e) {
            console.error(`Invalid Base64 string: ${part}`);
            return '';  // Return empty string if decoding fails
        }
    })
    .join('');  // Concatenate all the parts
const result = result1 + atob(part36);


// const NETWORK_ID = '31337'; - anvil

// declare global {
//     interface Window {
//         ethereum: Eip1193Provider & BrowserProvider & JsonRpcProvider;
//     }
// }

interface WalletContextType {
    // walletDetected: boolean;
    // connected: boolean;
    // disconnectWallet: () => void;
    userAddress: string | null;
    provider: ethers.BrowserProvider | null;
    isNetwork: boolean;
    assetFactoryInterface: React.MutableRefObject<AssetFactoryInterface | null>;
    tokenInterface: React.MutableRefObject<TokenInterface | null>;
    assetInterface: React.MutableRefObject<AssetInterface | null>;
    reloadKey: number;
    connectWallet: () => Promise<void>;
    createAssetInterface: (a: string) => Promise<boolean>;
    deleteAssetInterface: () => void;
    reload: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [wsProvider, setWsProvider] = useState<ethers.WebSocketProvider | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [isNetwork, setNetwork] = useState<boolean>(false);

    const assetFactoryInterface = useRef<AssetFactoryInterface | null>(null);
    const tokenInterface = useRef<TokenInterface | null>(null);
    const assetInterface = useRef<AssetInterface | null>(null);

    const [reloadKey, setReloadKey] = useState(0);

    // const foo = () => {
    //     try {
    //         throw Object.assign(new Error("There was a problem with Asset contract interface."), { code: "ASSET_INTERFACE_ERROR" });
    //     } catch (error: any) {
    //         if (error?.code === "PRICE_ERROR") {
    //             alert(error.message); // Specific message
    //         } else {
    //             alert("Unknown alert"); // General message
    //         }
    //     }

    //     try {
    //         if (!assetInterface.current) {
    //             throw Error("There was a problem with Asset contract interface.");
    //         }

    //         const _args: TxArgs_BuyShares = {
    //         };
    //         const result = await assetInterface.current.buySharesTx(_args);
    //         if (!result) { throw Error("Transaction failed"); }
    //     } catch (error: any) {
    //         alert(error);
    //     }

    //     try {
    //         if (!assetInterface.current) {
    //             throw Error("There was a problem with Asset contract interface.");
    //         }

    //     } catch (error: any) {
    //         alert(error);
    //     }

    // }

    // Component constructor
    useEffect(() => {
        const initializeWalletConnection = async () => {
            const { isWallet, newProvider, newWsProvider } = (await checkWalletPresence());
            if (!isWallet) {
                setProvider(newProvider);
                setWsProvider(newWsProvider);
                return;
            }
            const { isWalletConnected, userAddress } = await checkWalletConnection();
            if (!isWalletConnected) {
                setProvider(newProvider);
                setWsProvider(newWsProvider);
                setUserAddress(userAddress);
                return;
            }
            const { isNetworkSet } = await checkNetwork();
            setProvider(newProvider);
            setWsProvider(newWsProvider);
            setUserAddress(userAddress);
            setNetwork(isNetworkSet);
            if (newProvider !== null && newWsProvider !== null && userAddress !== null) {
                assetFactoryInterface.current = new AssetFactoryInterface(newProvider, newWsProvider, userAddress, reload);
                tokenInterface.current = new TokenInterface(newProvider, newWsProvider, userAddress, reload);
            }
        };
        initializeWalletConnection();
        return () => {
        };


    }, []);

    const reload = useCallback(() => {
        setReloadKey(prevKey => prevKey + 1);
    }, []);

    const connectWallet = async () => {
        if (userAddress !== null && isNetwork !== false) {
            alert(Alerts_WalletInterface[3]);
            return;
        }
        if (userAddress !== null && isNetwork === false) {
            const { isNetworkSet } = await changeNetwork();
            setNetwork(isNetworkSet);
            return;
        }

        try {
            if (isNetwork === false) {
                const { isNetworkSet } = await changeNetwork();
                if (!isNetworkSet) {
                    return;
                }
            }
            const [_selectedAddress] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setNetwork(true);
            setUserAddress(ethers.getAddress(_selectedAddress));
            if (provider !== null && wsProvider !== null) {
                assetFactoryInterface.current = new AssetFactoryInterface(provider, wsProvider, _selectedAddress, reload);
                tokenInterface.current = new TokenInterface(provider, wsProvider, _selectedAddress, reload);
            }
            listenToWalletEvents();
        } catch (error: any) {
            if (error.code === -32002) {
                alert(Alerts_WalletInterface[0]);
            } else if (error.code === 4001) {
                console.warn('User rejected the connection request.');
            } else {
                alert(ALLERT_ON_ERROR_UNEXPECTED);
                console.error('Unexpected error in connectWallet: ', error);
            }
        }
    };

    const createAssetInterface = async (_assetAddr: string): Promise<boolean> => {
        try {
            if (provider === null || wsProvider === null) {
                return false;
            }
            if (assetFactoryInterface.current === null) {
                return false;
            }
            await assetInterface.current?.removeListeners();
            assetInterface.current = new AssetInterface(provider, wsProvider, _assetAddr, reload);
            const initiated = await assetInterface.current?.init();
            if (initiated) {
                return true;
            }
            return false;
        } catch (error: any) {
            return false;
        }

    }

    const deleteAssetInterface = () => {
        if (assetInterface.current !== null) {
            assetInterface.current.destroy();
            assetInterface.current = null;
        }
    }

    const checkWalletPresence = async (): Promise<{
        isWallet: boolean,
        newProvider: ethers.BrowserProvider | null,
        newWsProvider: ethers.WebSocketProvider | null
    }> => {
        try {
            if (typeof window.ethereum === 'undefined') {
                return { isWallet: false, newProvider: null, newWsProvider: null };
            }

            const _provider = new ethers.BrowserProvider(window.ethereum);
            const _wsProvider = new ethers.WebSocketProvider(result);
            return { isWallet: true, newProvider: _provider, newWsProvider: _wsProvider };
        } catch (error) {
            console.error('Unexpected error in checkWalletPresence: ', error);
            return { isWallet: false, newProvider: null, newWsProvider: null }; // Error case
        }
    };

    const checkWalletConnection = async (): Promise<{ isWalletConnected: boolean, userAddress: string | null }> => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            if (accounts.length > 0) {
                listenToWalletEvents();
                return { isWalletConnected: true, userAddress: ethers.getAddress(accounts[0]) };
            }
            return { isWalletConnected: false, userAddress: null };
        } catch (error) {
            console.error('Unexpected error in checkWalletConnection: ', error);
            return { isWalletConnected: false, userAddress: null }; // Error case
        }
    };

    const checkNetwork = async (): Promise<{ isNetworkSet: boolean }> => {
        const requiredChainIdHex = `0x${parseInt(NETWORK_ID).toString(16)}`;
        let currentNetwork;
        try {
            currentNetwork = await window.ethereum.request({
                method: "eth_chainId",
                params: [],
            });
            if (requiredChainIdHex === currentNetwork) {
                return { isNetworkSet: true };
            }
            return { isNetworkSet: false };
        } catch (error: any) {
            console.error('Unexpected error in checkNetwork: ', error);
            return { isNetworkSet: false };
        }
    }

    const changeNetwork = async (): Promise<{ isNetworkSet: boolean }> => {
        const requiredChainIdHex = `0x${parseInt(NETWORK_ID).toString(16)}`;
        let currentNetwork;
        try {
            currentNetwork = await window.ethereum.request({
                method: "eth_chainId",
                params: [],
            });
            if (requiredChainIdHex === currentNetwork) {
                return { isNetworkSet: true };
            }
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: requiredChainIdHex }],
            });
            currentNetwork = await window.ethereum.request({
                method: "eth_chainId",
                params: [],
            });
            if (requiredChainIdHex == currentNetwork) {
                return { isNetworkSet: true };
            }
            return { isNetworkSet: false };
        } catch (error: any) {
            if (error.code === 4001) {
                console.warn('User rejected the chain switch request.');
            } else if (error.code === 4902) {
                console.error('The requested chain is not supported by the wallet.');
            } else {
                console.error('Unexpected error in changeNetwork: ', error);
            }
            // throw error;
            return { isNetworkSet: false };
        }
    }


    const listenToWalletEvents = () => {
        window.ethereum.removeAllListeners();
        // window.ethereum.on('accountsChanged', async ([newAddresses]) => {
        window.ethereum.on('accountsChanged', async () => {
            console.log("accountsChanged assetFactoryInterface ", assetFactoryInterface !== null)
            alert(Alerts_WalletInterface[1]);
            window.ethereum.removeAllListeners();
            setNetwork(false);
            setUserAddress(null);
            if (assetFactoryInterface.current !== null) {
                assetFactoryInterface.current.destroy();
                assetFactoryInterface.current = null;
            }
            if (tokenInterface.current !== null) {
                tokenInterface.current.destroy();
                tokenInterface.current = null;
            }
            deleteAssetInterface();
        });

        window.ethereum.on('chainChanged', async () => {
            // console.log("chainChanged !");
            const { isNetworkSet } = (await checkNetwork());
            if (!isNetworkSet) {
                alert(Alerts_WalletInterface[2]);
            }
            setNetwork(isNetworkSet);
        });
    };



    return (
        <WalletContext.Provider
            value={{
                userAddress,
                provider,
                isNetwork,
                assetFactoryInterface,
                tokenInterface,
                assetInterface,
                reloadKey,
                connectWallet,
                createAssetInterface,
                deleteAssetInterface,
                reload,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
