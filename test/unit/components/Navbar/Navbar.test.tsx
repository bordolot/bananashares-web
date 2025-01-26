import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MockMetaMaskProvider } from "../../../utilities/MockMetaMaskProvider";
import App from "../../../../src/App"
import React, { act } from "react";
import "@testing-library/jest-dom/vitest";
import { ALLERT_ON_ERROR_NO_METAMASK } from "../../../../src/utility/allerts";


describe("Test Navbar", () => {
    let mockMetaMask: MockMetaMaskProvider;
    beforeAll(() => {
        global.alert = vi.fn();

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: query.includes("(max-width: 768px)"),
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
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

        // expect error
        await act(async () => {
            const result = fireEvent.click(displayedScreenButton);
        });
        expect(global.alert).toHaveBeenCalledWith(ALLERT_ON_ERROR_NO_METAMASK);

    })
})