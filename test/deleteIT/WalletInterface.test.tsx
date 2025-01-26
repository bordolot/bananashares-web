import { renderHook, act } from "@testing-library/react";
import { WalletProvider, useWallet } from "../../src/components/WalletInterface"; // Adjust the path as needed.
import { describe, expect, test } from "vitest";


describe("WalletInterface", () => {
    test("useWallet provides the userAddress", async () => {
        // Render the hook within the WalletProvider
        const { result } = renderHook(() => useWallet(), {
            wrapper: WalletProvider,
        });

        // Initially, userAddress should be null
        expect(result.current.userAddress).toBe(null);


        // await act(async () => {
        //     await result.current.someAsyncFunction();
        // });
        // await act(() => {
        //     result.current.someSyncFunction();
        // });



        // Simulate an action to update userAddress
        // In this example, you'll need to extend your WalletProvider with a function to update the address.
    })
});
