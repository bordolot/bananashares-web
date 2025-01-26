import { render, screen, fireEvent } from "@testing-library/react";
import { ethers } from "ethers";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MockMetaMaskProvider } from "../utilities/MockMetaMaskProvider";
import assetabi from "../../src/abi/AssetAbi.json";
import React from "react";
import WalletConnector from "../../src/components/WalletConnector";


var window: any;

describe("MyComponent", () => {

  beforeEach(() => {

    const rpcUrl = "http://127.0.0.1:8545"; // Anvil RPC or your test node
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with a private key from your Anvil setup

    const mockMetaMask = new MockMetaMaskProvider(rpcUrl, privateKey);
    mockMetaMask.inject();

  });


  it("interacts with a mocked MetaMask provider", async () => {
    // Simulate a user action that requires MetaMask
    render(< WalletConnector />);

    // Mock MetaMask account request
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

    console.log("accounts", accounts);
    expect(accounts).toEqual(["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]); // Replace with your mocked address

    // Interact with a contract using the mocked signer
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract("0xCafac3dD18aC6c6e92c921884f9E4176737C052c", assetabi.abi, signer);

    // Mock contract interaction
    const mockFunction = vi.fn().mockResolvedValue("Mocked Result");
    // contract.someFunction = mockFunction;

    const result = await contract.nameOfSong();
    console.log(result);
    expect(result).toBe("Bohemian rapsody");
    // expect(mockFunction).toHaveBeenCalled();



    // window.ethereum.on = vi.fn((event, listener) => {
    //   if (event === "accountsChanged") {
    //     setTimeout(() => listener(["0xNewMockedAddress"]), 100); // Simulate account change
    //   }
    // });

    // In your test
    // await fireEvent.click(screen.getByText("Change Account")); // Example action triggering account change
    // expect(await screen.findByText("0xNewMockedAddress")).toBeInTheDocument();

  });
});


