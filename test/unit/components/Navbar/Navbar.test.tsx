import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MockMetaMaskProvider } from "../../../utilities/MockMetaMaskProvider";
import React, { act } from "react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";


import { ALLERT_ON_ERROR_NO_METAMASK } from "../../../../src/utility/allerts";
import { SPINNER_DURATION } from "../../../../src/utility/Globals";
import App from "../../../../src/App";
import { rpcUrl, privateKey } from "../../../globals";




describe("Test Navbar with no metamask", () => {

    beforeAll(() => {
        global.alert = vi.fn();




        // Object.defineProperty(window, "scrollTo", {
        //     value: vi.fn(), // or vi.fn()
        //     writable: true,
        // });

    });

    afterEach(() => {
        vi.clearAllMocks()
        cleanup();
    });


    // afterAll(() => {
    //     vi.restoreAllMocks();
    // });

    test("Test connect button", async () => {
        let displayedScreenText;
        let displayedScreenButton;
        render(<App />);
        displayedScreenText = screen.queryByText("About section");
        displayedScreenButton = screen.queryByText("Connect");
        expect(displayedScreenText).toBeInTheDocument();
        expect(displayedScreenButton).toBeInTheDocument();

        // expect error
        await act(async () => {
            const result = fireEvent.click(displayedScreenButton);
        });
        expect(global.alert).toHaveBeenCalledWith(ALLERT_ON_ERROR_NO_METAMASK);

        // call connectWallet()
        // goto WalletInterface.test
    });

    test("Test title buttons - full screen", async () => {
        let displayedScreenText;
        let displayedTitleButton;
        let displayedDropdown;
        let displayedDropdownButton;
        const user = userEvent.setup();

        render(<App />);

        displayedTitleButton = screen.getByTestId("TitleButton");
        expect(displayedTitleButton).toBeInTheDocument();

        displayedDropdown = screen.queryByTestId("TitleButton_Dropdown");
        expect(displayedDropdown).not.toBeInTheDocument();

        expect(screen.queryByText("About")).not.toBeInTheDocument();
        expect(screen.queryByText("Getting started")).not.toBeInTheDocument();
        expect(screen.queryByText("Docs")).not.toBeInTheDocument();
        expect(screen.queryByText("Help")).not.toBeInTheDocument();

        await user.hover(displayedTitleButton);

        displayedDropdown = screen.getByTestId("TitleButton_Dropdown");
        expect(displayedDropdown).toBeVisible();

        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Getting started")).toBeInTheDocument();
        expect(screen.getByText("Docs")).toBeInTheDocument();
        expect(screen.getByText("Help")).toBeInTheDocument();

        displayedDropdownButton = screen.getByText("Help");
        await fireEvent.click(displayedDropdownButton);
        displayedScreenText = screen.getByText("Help section");
        expect(displayedScreenText).toBeInTheDocument();

        displayedDropdownButton = screen.getByText("Docs");
        await fireEvent.click(displayedDropdownButton);
        displayedScreenText = screen.getByText("Docs section");
        expect(displayedScreenText).toBeInTheDocument();

        displayedDropdownButton = screen.getByText("Getting started");
        await fireEvent.click(displayedDropdownButton);
        displayedScreenText = screen.getByText("Getting started section");
        expect(displayedScreenText).toBeInTheDocument();

        displayedDropdownButton = screen.getByText("About");
        await fireEvent.click(displayedDropdownButton);
        displayedScreenText = screen.getByText("About section");
        expect(displayedScreenText).toBeInTheDocument();
    });



    test("Test navbar buttons - full screen", async () => {
        vi.useFakeTimers();
        let displayedScreenText;
        let displayedButton;
        const user = userEvent.setup();

        render(<App />);

        displayedButton = screen.getByText("Create Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("No Ethereum wallet was detected.");
        expect(displayedScreenText).toBeInTheDocument();

        displayedButton = screen.getByText("Find Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("No Ethereum wallet was detected.");
        expect(displayedScreenText).toBeInTheDocument();

        vi.useRealTimers();
    });


})









describe("Test Navbar with metamask", () => {
    let mockMetaMask: MockMetaMaskProvider;
    beforeAll(async () => {
        global.alert = vi.fn();

    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(async () => {
        await act(async () => {
            mockMetaMask.disconnect();
            mockMetaMask.emit('accountsChanged');
        });
        cleanup();
    });


    afterAll(() => {
        vi.restoreAllMocks();
    });


    test("Test connect button", async () => {
        let displayedScreenText;
        let displayedScreenButton;
        render(<App />);
        displayedScreenText = screen.queryByText("About section");
        displayedScreenButton = screen.queryByText("Connect");
        expect(displayedScreenText).toBeInTheDocument();
        expect(displayedScreenButton).toBeInTheDocument();

        mockMetaMask = new MockMetaMaskProvider(rpcUrl, privateKey);
        mockMetaMask.inject();

        // expect error
        await act(async () => {
            fireEvent.click(displayedScreenButton);
        });
        displayedScreenButton = screen.queryByText("Connected");

    })


    test("Test navbar buttons - full screen", async () => {
        vi.useFakeTimers();
        let displayedScreenText;
        let displayedButton;
        const user = userEvent.setup();

        render(<App />);

        displayedButton = screen.getByText("Create Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("Please connect to your wallet.");
        expect(displayedScreenText).toBeInTheDocument();

        displayedButton = screen.getByText("Find Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("Please connect to your wallet.");
        expect(displayedScreenText).toBeInTheDocument();

        displayedButton = screen.queryByText("Connect");
        await act(async () => {
            fireEvent.click(displayedButton);
        });

        displayedButton = screen.queryByText("Connected");

        displayedButton = screen.getByText("Create Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("Tokenize your asset:");
        expect(displayedScreenText).toBeInTheDocument();

        displayedButton = screen.getByText("Find Asset");
        await fireEvent.click(displayedButton);
        await act(async () => {
            vi.advanceTimersByTime(SPINNER_DURATION);
        });
        displayedScreenText = screen.queryByText("Connect to your asset");
        expect(displayedScreenText).toBeInTheDocument();

        vi.useRealTimers();
    });





})