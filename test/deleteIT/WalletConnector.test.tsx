import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import WalletConnector from "../src/components/WalletConnector";
import { privateKey, rpcUrl } from "./globals";
import { MockMetaMaskProvider } from "./utilities/MockMetaMaskProvider";
import { describe, test, beforeAll, afterEach, expect } from "vitest";
import React, { act } from "react";
import "@testing-library/jest-dom/vitest";

// var window: any;

describe("WalletConnector", () => {
    let mockMetaMask: MockMetaMaskProvider;
    // beforeAll(async () => {
    //     await prepareSomething();
    //     return async () => {
    //         await resetSomething();
    //     }
    // });

    afterEach(() => {
        // delete window.ethereum;
    })

    test("Check wallet availability", () => {
        render(<WalletConnector />)
        const result_1 = screen.queryByText("No Wallet");
        const result_2 = screen.queryByText("Wallet Available");
        expect(result_1).toBeInTheDocument();
        expect(result_2).toEqual(null)
        cleanup();

        mockMetaMask = new MockMetaMaskProvider(rpcUrl, privateKey);
        mockMetaMask.inject();

        render(<WalletConnector />)
        const result_3 = screen.queryByText("No Wallet");
        const result_4 = screen.queryByText("Wallet Available");
        expect(result_3).toEqual(null)
        expect(result_4).toBeInTheDocument();
    })

    test("Connect to the wallet by clicing the button \"Connect Wallet\".", async () => {
        let connectButton;
        render(<WalletConnector />)
        expect(screen.queryByText("Wallet Available")).toBeInTheDocument();
        expect(screen.queryByText("Connect Wallet")).toBeInTheDocument();
        expect(screen.queryByText("No Wallet")).toBeNull();
        connectButton = screen.getByText("Connect Wallet");
        await act(async () => {
            fireEvent.click(connectButton);
        });
        expect(screen.queryByText("Wallet Connected")).toBeInTheDocument();

        act(() => {
            mockMetaMask.emit('accountsChanged', []);
        });
        expect(screen.queryByText("Connect Wallet")).toBeInTheDocument();

        connectButton = screen.getByText("Connect Wallet");
        await act(async () => {
            fireEvent.click(connectButton);
        });
        expect(screen.queryByText("Wallet Connected")).toBeInTheDocument();



    })




});



async function prepareSomething() {
    // const mockMetaMask = new MockMetaMaskProvider(rpcUrl, privateKey);
    // mockMetaMask.inject();
    console.log("START");
}

async function resetSomething() {
    console.log("END");
}

