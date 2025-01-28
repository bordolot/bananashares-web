import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { Alerts_WalletInterface } from './Alerts/Alerts';
import { AssetFactoryInterface } from './AssetFactoryInterface';
import { AssetInterface } from './AssetInterface';
import { ALLERT_ON_ERROR_UNEXPECTED } from '../utility/allerts';


const NETWORK_ID = '31337'; // in hex 0x7A69;
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
    assetInterface: React.MutableRefObject<AssetInterface | null>;
    reloadKey: number;
    connectWallet: () => Promise<void>;
    createAssetInterface: (a: string) => boolean;
    deleteAssetInterface: () => void;
    reload: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [isNetwork, setNetwork] = useState<boolean>(false);

    const assetFactoryInterface = useRef<AssetFactoryInterface | null>(null);
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
            const { isWallet, newProvider } = (await checkWalletPresence());
            if (!isWallet) {
                setProvider(newProvider);
                return;
            }
            const { isWalletConnected, userAddress } = await checkWalletConnection();
            if (!isWalletConnected) {
                setProvider(newProvider);
                setUserAddress(userAddress);
                return;
            }
            const { isNetworkSet } = await checkNetwork();
            setProvider(newProvider);
            setUserAddress(userAddress);
            setNetwork(isNetworkSet);
            if (newProvider !== null && userAddress !== null) {
                assetFactoryInterface.current = new AssetFactoryInterface(newProvider, userAddress, reload);
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
            const [selectedAddress] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setNetwork(true);
            setUserAddress(selectedAddress);
            if (provider !== null) {
                assetFactoryInterface.current = new AssetFactoryInterface(provider, selectedAddress, reload);
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

    const createAssetInterface = (_assetAddr: string): boolean => {
        try {
            if (provider !== null && assetFactoryInterface.current !== null) {
                assetInterface.current = new AssetInterface(provider, _assetAddr, reload);
                return true;
            } else {
                return false;
            }
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

    const checkWalletPresence = async (): Promise<{ isWallet: boolean, newProvider: ethers.BrowserProvider | null }> => {
        try {
            if (typeof window.ethereum === 'undefined') {
                return { isWallet: false, newProvider: null };
            }

            const _provider = new ethers.BrowserProvider(window.ethereum);
            return { isWallet: true, newProvider: _provider };
        } catch (error) {
            console.error('Unexpected error in checkWalletPresence: ', error);
            return { isWallet: false, newProvider: null }; // Error case
        }
    };

    const checkWalletConnection = async (): Promise<{ isWalletConnected: boolean, userAddress: string | null }> => {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts',
            });
            if (accounts.length > 0) {
                listenToWalletEvents();
                return { isWalletConnected: true, userAddress: accounts[0] };
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
