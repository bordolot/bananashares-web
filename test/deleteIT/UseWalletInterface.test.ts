import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { UseWalletConnector } from "../../src/components/hooks/UseWalletConnector";
import { privateKey, rpcUrl } from "../globals";
import { MockMetaMaskProvider } from "../utilities/MockMetaMaskProvider";
import { describe, test, beforeAll, afterEach, expect } from "vitest";

import "@testing-library/jest-dom/vitest";

// var window: any;

describe("UseWalletConnector", () => {
    // beforeAll(async () => {
    //     await prepareSomething();
    //     return async () => {
    //         await resetSomething();
    //     }
    // });

    afterEach(() => {
        // delete window.ethereum;
    })

    test("Try connect Wallet", async () => {
        const { result } = renderHook(() => UseWalletConnector());
        expect(result.current.address).toBe(null);
        expect(result.current.error).toBe(null);

        await act(async () => {
            await result.current.connectWallet();
        });
        expect(result.current.address).toBe(null);
        expect(result.current.error).not.toBe(null);
        act(() => {
            result.current.setError(null);
        });

        const mockMetaMask = new MockMetaMaskProvider(rpcUrl, privateKey);
        mockMetaMask.inject();
        await act(async () => {
            await result.current.connectWallet();
        });
        expect(result.current.address).not.toBe(null);
        expect(result.current.error).toBe(null);
    })


});