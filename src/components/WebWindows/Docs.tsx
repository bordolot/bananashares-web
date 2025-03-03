import React from "react";
import { CodeBlock } from "../../components_generic/SimpleCompenents";

import DiagramArchitecture from "../../assets/Docs/architecture.svg?react";
import DiagramTokenDistribution from "../../assets/Docs/token_distribution.svg?react";
import { getCurrentPhase } from "./About";

const intro = [
    { id: "intro", title: "Inroduction", content: <div className="text-justify">This section explains all aspects of the Bananashares protocol. The documentation is divided into four parts: User Docs, Governance, How-To Guides, and Dev Docs. User Docs define all concepts associated with the creation of new asset contracts and interacting with those already created. Governance introduces the main concepts of the DAO aspects of the protocol. How-To Guides explain how to use the platform.  Dev Docs thoroughly describe the backend of this dapp, focusing on the architecture, chosen blockchain technology, and details of the smart contracts used in this protocol.</div> },
];

const userDocs = [
    {
        id: "key-concepts", title: "Main Idea", content:
            <div className="docs_paragraf">
                The main idea of this protocol is to enable anyone to profit more easily from their work or possessions, allowing fans or potential investors to become part of their activity by creating an immutable instance of this work or possession as a smart contract on the blockchain. The mechanism used here guarantees constant liquidity of the shares sold and ensures a continuous profit for creators from trading shares. A creator can also introduce channels through which anyone can transfer funds into the instance, for example, to purchase the right to commercial use of their work or simply to express their support for the activity. The protocol facilitates the distribution of any income from these channels to all shareholders. To use all these features, all you need is an active crypto wallet - there's no need to create an account, log in, or sign in. The security of all transactions is guaranteed by the Ethereum blockchain and the Optimism network.
            </div>
    },
    {
        id: "key-actors", title: "Key Actors", content:
            <div className="docs_paragraf">
                Four types of platform users can be distinguished: privileged shareholder, regular shareholder, license purchaser, and asset instance creator.
                <div className="py-2">
                    <span className="font-bold">privileged shareholder</span> - is the owner of the address placed in the asset tokenization form. They are the original owners of an asset instance. At the moment of asset instance creation, all shares must be distributed by the asset instance creator to all privileged shareholders. Each privileged shareholder, regardless of the number of shares held, has the right to upload a hash of a license, and deactivate or activate it if necessary. They can sell their shares by creating an offer, changing their offer, or canceling their offer at any time. They can buy any shares available in the offer list, and upon a successful purchase, the protocol does not create a new sell offer from the bought shares, unlike for normal shareholders.
                </div>
                <div className="py-2">
                    <span className="font-bold">normal shareholder</span> - is any address that purchased any share from any offer from the list of offers and does not belong to any privileged shareholder defined in an asset. In the process of buying shares, they are required to specify a price they are willing to sell their shares for, because a new sell offer is created with their freshly bought shares. They can change the sell price at any moment but cannot cancel the offer, unlike privileged shareholders.
                </div>
                <div className="py-2">
                    <span className="font-bold">licence purchaser</span> - is the owner of an address that makes a payment in ether as described in a license.
                </div>
                <div className="py-2">
                    <span className="font-bold">asset instance creator</span> - is the owner of an address that sends a transaction for the asset tokenization. This is their only role in this app. They don't become a privileged shareholder unless their address is placed in the tokenization form as a privileged shareholder.
                </div>
            </div>
    },
    {
        id: "song-tokenization", title: "Asset Tokenization", content:
            <div className="docs_paragraf">
                Asset tokenization is a process that requires filling out the asset tokenization form. The result of this process is the creation of a new asset instance that handles most of features of this protocol. If the process is successfully completed, you will receive the smart contract address of the asset instance. It is crucial to save this address and share it with your community to enable anyone interested to interact with the smart contract of your asset instance through this dapp. The most important part of the tokenization process is uploading a manifest. <span className="font-bold">The manifest</span> is a document that describes how you understand the transfer of ownership of your asset into shares, along with your rights and obligations, in addition to what the protocol enables. The protocol creates a hexadecimal hash out of this document and saves it on the blockchain. This file should be shared with anyone interested so they can compare it with the hash saved on the blockchain, ensuring that users are interacting with the correct smart contract.
            </div>
    },

    {
        id: "song-smartcontract", title: "Asset Instance", content:
            <div className="docs_paragraf">
                An asset instance is a piece of code written in Solidity containing all variables and functions. These variables specify information about the asset, shares distribution, balances, etc. Functions enable changing the state of these variables. More information can be found in the Dev Docs section.
            </div>
    },

    {
        id: "song-shares", title: "Asset Instance Shares", content:
            <div className="docs_paragraf">
                An asset instance has a fixed total amount of shares that must be distributed to all shareholders. This total amount is 1,000,000 shares. Each share gives the right to a proportional part of the ethers paid for a license by a license purchaser. Specific rights and obligations of a shareholder can be specified in a manifest used in the asset tokenization process by an asset instance creator. A privileged shareholder holds at least one share at the moment of asset instance creation. If a user wants to become a normal shareholder, they need to purchase at least one share from an offer.
            </div>
    },
    {
        id: "offers", title: "Offers", content:
            <div className="docs_paragraf">
                An offer consists of three elements: the address of the offer owner, the number of shares, and the price the owner is willing to sell them for. All offers are displayed in the list of offers. To use an offer to buy shares, certain restrictions must be fulfilled. If a buyer already has some shares and there was a payment for a license, they must first collect all their dividends. If the owner of an offer has any dividends or fees to collect, the buyer must collect those dividends or fees in the name of the owner before they can buy any shares. Alternatively, the buyer can wait for the owner to collect their fees or dividends themselves.
            </div>
    },

    {
        id: "licenses", title: "Licenses", content:
            <div className="docs_paragraf">
                A license is a hash of a document that provides a specific explanation of why anyone would transfer funds to an asset instance. The license must also specify the amount in Ether. Any privileged shareholder can upload a license to the asset instance and activate or deactivate it. A deactivated license is not visible to any users except for privileged shareholders. Privileged shareholders should share this document with anyone who wants to read the terms of use and compare the hash of the document with the hash uploaded to the asset instance.
            </div>
    },

    {
        id: "incomes", title: "Incomes", content:
            <div className="docs_paragraf">
                <div>
                    Privileged shareholders can profit from three sources: selling their shares, dividends from selling licenses, and fees paid by anyone who buys shares from an offer created by a normal shareholder.
                </div>
                <br />
                <div>
                    Normal shareholders can profit from two sources: selling their shares and dividends from selling licenses.
                </div>
                <br />
                <div>
                    To withdraw ether, you need to have your income placed in your balance. When somebody buys your shares, the paid ether is saved directly to your balance. When somebody buys a license, a payment is saved as a whole in the asset instance. This means that each payment is an independent entity and is not distributed automatically. To get your part saved in your balance, you need to collect it yourself or by anyone who wants to buy your shares. The similar role applies to fees for privileged shareholders. They are initially saved as a whole for all privileged shareholders. To be saved in each privileged shareholder's balance, they need to be collected.
                </div>
                <br />
                <div className="font-bold">
                    If you are a privileged shareholder and are selling your shares during the Bananashares token distribution to initial users, you need to be aware that, in addition to being minted some Bananashares tokens, your right to withdraw collected Ether will be suspended for one year from the token minting date. This is done to prevent flash loan attacks and protocol centralization.
                </div>
            </div>
    },

    {
        id: "fees", title: "Fees", content:
            <div className="docs_paragraf">
                <div>
                    There are two types of fees: fees paid to privileged shareholders and fees paid to the protocol. When a privileged shareholder creates an offer, they need to specify the price per share. When sending the offer, the smart contract adds a part of this price to the final price per share as a fee for the protocol. When a normal shareholder creates an offer, which happens immediately after buying any shares, the protocol adds commision for the protocol and commision for all privileged shareholders.
                </div><br />
                <div>
                    For exampe if:<br />
                    commition for the protocol = 1% <br />
                    commition for the privileged shareholders = 2% <br />
                    The fees for any buy/sell transaction of shares are 1% if an offer is created by a privileged shareholder or 3% if an offer is created by a normal shareholder.
                </div><br />
                <div className="font-bold">
                    There are no additional fees in the protocol.
                </div><br />
                <div className="font-bold">
                    Current fees:<br />
                    commition for the protocol = 0% <br />
                    commition for the privileged shareholders = 2%
                </div>
                <br />
                <div className="font-bold">
                    Fees can be changed by the governance.
                </div>
            </div>
    },

];

const governance = [
    {
        id: "gov-Main Concepts", title: "Main Concepts", content:
            <div className="docs_paragraf">
                <div>
                    The Bananashares protocol is designed to become a decentralized autonomous organization (DAO).
                    The core consists of two contracts: BananasharesToken and BananasharesGov.
                    The BananasharesToken contract is responsible for keeping a record of all ERC-20 tokens, where each token grants one vote in any voting proposal created in the BananasharesGov contract.
                    Becoming a DAO is a process, meaning it is divided into steps described in the "Token Distribution" section.
                </div>
                <br />
                <div className="font-bold">
                    The protocol is currently in phase {getCurrentPhase()}. This means both contracts are deployed on the test network, and any voting process is for testing purposes only.
                </div>
                <br />
                <div className="py-2">
                    <span className="font-bold">BananasharesToken</span> - a standard ERC-20 token with the ERC20Votes extension (see Dev Docs).
                    The maximum number of tokens available for minting is defined by the `MAX_SUPPLY` constant, which is set to 1,000,000,000 tokens.
                    Each token has a standard 10^18 decimals.
                </div>


                <div className="py-2">
                    <div>
                        <span className="font-bold">BananasharesGov</span> - a collection of standard contracts that enables modifications to the protocol’s functionality.
                        Currently, it allows:
                    </div>
                    <div>
                        - Updating the implementation contracts for both core protocol contracts, "AssetInstanceProxy" and "AssetFactoryProxy".
                    </div>
                    <div>
                        - Adjusting the commission rates for the protocol and privileged shareholders.
                    </div>
                    <div>
                        - Modifying the minimum price per share in an offer within an asset instance.
                    </div>
                    <br />
                    BananasharesGov operates based on constants set at deployment on the blockchain:

                    <div>
                        - <span className="font-bold">Voting delay</span>: Set to 1 day — the period after a proposal is submitted before voting begins.
                    </div>
                    <div>
                        - <span className="font-bold">Proposal threshold</span>: Set to 5% of `MAX_SUPPLY` — the minimum number of Bananashares tokens required to submit a proposal.
                    </div>
                    <div>
                        - <span className="font-bold">Voting period</span>: Set to 1 week — the duration during which voting is active, allowing all Bananashares token holders to cast their votes.
                    </div>
                    <div>
                        - <span className="font-bold">Quorum fractiony</span>: Set to 51% — the minimum percentage of Bananashares tokens in circulation required for a vote to be executed.
                        If this threshold is not met, the proposal will not pass, regardless of the number of votes in favor.
                    </div>
                    <div>
                        - <span className="font-bold">Timelock delay</span>: Set to 1 day — the period after the voting ends before the winning proposal can be executed.
                    </div>
                </div>
            </div>
    },
    {
        id: "gov-Token distribution", title: "Token distribution", content:
            <div className="docs_paragraf">
                <DiagramTokenDistribution className="rounded-xl p-1" />
            </div>
    },



];



const howToGuides = [
    {
        id: "application", title: "How to use this dapp", content:
            <div className="docs_paragraf">
                To use this dapp you need an active Metamask or Coinbase wallet. All transactions are made on the Optimism network, which means you need to transfer the proper amount of ether from the Ethereum mainnet to the Optimism mainnet using an adequate bridge protocol. Choose the "Create Asset" tab if you are a creator who wants to tokenize an asset. Choose the "Fide Asset" if you are a creator or a common user who wants to interact with an asset instance. Click connect to connect this site with your wallet. If your wallet is connected to a different network than Optimism by default, you will be prompted to change the network, which you should accept.
            </div>
    },
    {
        id: "tokenization", title: "How to tokenize an asset", content:
            <div className="docs_paragraf">
                To tokenize your asset, you need to fill out the form in the "Create Asset" tab. The form consists of a few fields: the title of the asset, the list of privileged shareholders, and the asset hash. Initially, there is only one position in the list of privileged shareholders. This list can be expanded up to 10 positions. Each position in the list of privileged shareholders consists of four elements: the name, the address, and the number of shares. The address is a hexadecimal number of a crypto account of a future privileged shareholder. A hash of the asset is a 32-byte long hexadecimal number that serves as proof that this is your asset. To create the hash of the asset, you need a special document called a manifest. This special document can be for example prepared in the form of an agreement written by a lawyer or another specialist in which you can specify the detailed rights of privileged and normal Shareholders. This document need to be uploaded to this platform. Next, you just need to choose the HASH FILES button to start the hashing method. In the process, the uploaded file is encoded into a base32 string, and this base32 string is finally put into the hashing function. At the end of the hashing function, the encoded file will be downloaded to your disk. It is crucial to save those files, original and encoded and share them with the community so anyone can use those files to hash them again and compare this hash with the hash saved on a smart contract of your asset. This is the way to confirm that the smart contract represents your asset. We use the base32 string format to ensure that the content of those files will not change during various operations like saving, copying, or downloading. This is because changing only one letter in the file will totally change the hash. After filling in all positions, hit the TOKENIZE button, confirm the transaction in your crypto wallet, and wait for the response from the network. After a successful transaction, you will receive an address of your asset instance. You can now start interacting with your asset instance.
            </div>
    },
    {
        id: "connect-to-song", title: "How to connect to an asset instance", content:
            <div className="docs_paragraf">
                To connect to a song, find an address of this asset instance. An asset instance creator or any privileged shareholder should share this address with everyone on their website or social media accounts. Next, paste this address into the form in the "Find Asset" tab and click "Try to connect". If the address is correct, you should be forwarded to the asset panel.
            </div>
    },
    {
        id: "selling", title: "How to sell my shares", content:
            <div className="docs_paragraf">
                <div>
                    If you are a privileged shareholder, to sell your shares, you need to connect to your asset in the "Find Asset" tab and click "Make Sell Offer". A window should appear where you can specify the number of shares you want to sell and the price you want to get for any of your shares. When you are ready, click "Submit" and confirm the transaction in your crypto wallet to send the transaction.
                </div>
                <br />
                <div>
                    If you are a normal shareholder, you have no option of creating any sell offers because any shares you bought are automatically put into a new sell offer. A normal shareholder needs to accept that their shares are always available for purchase.
                </div>
            </div>
    },
    {
        id: "cancel-an-offer", title: "How to cancel my offer", content:
            <div className="docs_paragraf">
                <div>
                    If you are a privileged shareholder, you can cancel your offer in the "Additional Options" by clicking the "Cancel Offer" button. A window should appear where you can confirm your decision.
                </div>
                <div>
                    If you are a normal shareholder, you cannot cancel your offer.
                </div>
            </div>
    },
    {
        id: "change-an-offer", title: "How to change my offer", content:
            <div className="docs_paragraf">
                <div>
                    If you are a privileged shareholder, you can change your offer in the "Additional Options" by clicking the "Change Offer" button. A window should appear where you can specify the new number of shares and the new price per share. When you are ready, you can confirm your decision by clicking "Submit".
                </div>
                <div>
                    If you are a normal shareholder, you can change your offer in the "Additional Options" by clicking the "Change Offer" button. A window should appear where you can specify only the new price per share. You cannot change the number of shares in your offer.
                </div>
            </div>
    },
    {
        id: "buying", title: "How to buy shares", content:
            <div className="docs_paragraf">
                To buy a share, you need to choose an offer from the list of offers.
                <div>
                    If you are a privileged shareholder, a window should appear where you can specify the number of shares you want to buy. If you are not a privileged shareholder, additionally in this window, there will be a place to specify the price you will be willing to sell them because the protocol will automatically create a new sell offer out of your shares.
                </div>
                <div>
                    There could be a situation where the "Buy shares" button in the list of offers is not active. This could happen when you, as a user, have a dividend and/or fees if you are a privileged shareholder to collect. The other situation is when the owner of an offer has a dividend and/or fees to collect. When one or both of these situations occur, you need to collect those dividends and fees, for yourself and/or for the owner of the offer, to enable the "Buy shares" button.
                </div>
            </div>
    },
    {
        id: "place-license", title: "How to upload a license", content:
            <div className="docs_paragraf">
                <div>
                    To upload a license, you need to be a privileged shareholder. Click the "Upload new license" button. A window should appear where you need to specify the value in ether a license purchaser needs to pay to get the specific rights to the asset and upload a file that contains the content of this license. Prepare a license in the form of a file in the .txt or .md format that contains specific license conditions. In the upload a license window, click "Upload File" and choose this file. Like in the tokenization process, this uploaded file is encoded into a base32 string and this base32 string is put into the hashing function. The resulting hash will then be placed into the asset instance to become the basis to recognize and confirm the specific license. Upon successful hashing, you will receive this base32 string in the form of a .txt file to save. The base32 string file should be shared with any potential license purchaser. This way, a license purchaser can be familiar with the content of a license and be able to compare the hash saved on the asset instance with the hash created with the shared base32 string file.
                </div>
                <div>
                    As a privileged shareholder, you have the option to activate and deactivate a license. Deactivating a license means that all other users will not see this license in the list of licenses. You can activate it to move it back to this list.
                </div>
            </div>
    },
    {
        id: "sign-license", title: "How to buy a license", content:
            <div className="docs_paragraf">
                Buying a license means that an owner of an address sends an amount of ether assigned to this license. In return, they gain the rights described in the license. To do this, first check if there are any active licenses in the licenses section. If there is, choose the hash of the license you want to buy. You can check the hash and the content of this license by taking the base32 string file of this license from the source shared by the privileged shareholder who uploaded it. Click "Check License" and upload the base32 string file. Then you can hash it and compare the given hash with the hash you chose. When you are sure which license you want to buy, click "Sign License" and confirm the transaction in your crypto wallet.
            </div>
    },
    {
        id: "collect-income", title: "How to collect my income", content:
            <div className="docs_paragraf">
                <div>
                    Collecting income means that you get your share of the license payment or fees for trade and save that share in your balance on an asset instance. Withdrawing means taking all the Ether stored in the balance and sending it from the asset instace to the cryptocurrency wallet address assigned to that balance. If you have any Ether to collect on the asset instance, in the additional options section, there should appear "You have dividends to collect" (if there was a payment for a license) or "You have fees to collect" (if you are a privileged shareholder and there was a transaction of buying a normal shareholder's offer). To collect this Ether, just click "Collect" and confirm the transaction in your crypto wallet.
                </div>
                <br />
                <div>
                    Finally, if there is any Ether in your balance, there should appear the sign: "You can withdraw:..." and the button "Withdraw". Click it to send this Ether to your crypto wallet.
                </div>
                <br />
                <div className="font-bold">
                    If you are a privileged shareholder and are selling your shares during the Bananashares token distribution to initial users, you need to be aware that, in addition to being minted some Bananashares tokens, your right to withdraw collected Ether will be suspended for one year from the token minting date. This is done to prevent flash loan attacks and protocol centralization.
                </div>

            </div>
    },
];


// const Titles = [
//     'Type', 'Name', 'Description'
// ];

// const EventTitles = [
//     'Type', 'Indexed', 'Name', 'Description'
// ];


// const S_Struct_1 = `
//     xxx
//   `;
// const SongStruct_1 = [
//     { column1: 'xxx', column2: 'xxx', column3: '' },
// ];

// const SongStateVariables = [
//     { column1: 'xxx', column2: 'xxx', column3: '' },
// ];

// const S_Event_x = `
//     xxx
// `;

// const SongEvent_x = [
//     { column1: 'xxx', column2: 'True', column3: 'xxx', column4: '' },
//     { column1: 'xxx', column2: 'False', column3: 'xxx', column4: '' },
// ];

// const S_Function_x = `
//     // ... .
//     xxx
//   `;

// const SongFunction_x = [
//     { column1: 'xxx', column2: 'xxx', column3: '' },
// ];


////////////////////
//  AssetFactoryProxy 
////////////////////

const AFP_Function_1 = `
    /// @notice Sends the token minting order to the BananasharesToken contract.
    /// @param _tokenReceiver_1 The address of the token receiver (regular)
    /// @param _tokenReceiver_2 The address of the token receiver (privileged)
    /// @param _numberOfAssetShares The number of shares in an \`AssetFactoryProxy\` sold by a privileged shareholder.
    /// @param _alreadyMinted The number of Bananashares Tokens that an \`AssetFactoryProxy\` has already requested to mint for its users.
    function sendTokenMintingOrder(
        address _tokenReceiver_1,
        address _tokenReceiver_2,
        uint256 _numberOfAssetShares,
        uint256 _alreadyMinted
    ) external onlyAssetInstance returns (uint256, uint256);
  `;

// const AssetFactoryProxyFunction_1 = [
//     { column1: 'string', column2: '_nameOfSong', column3: 'The title of a song.' },
//     { column1: 'string[]', column2: '_authors', column3: 'The list of Privileged Shareholders.' },
//     { column1: 'address[]', column2: '_shareholderAddress', column3: 'The list of addresses for each Privileged Shareholder.' },
//     { column1: 'uint24[]', column2: '_shares', column3: 'The list of shares each Privileged Shareholder will hold.' },
//     { column1: 'bytes32', column2: '_songHash', column3: 'The hash of a song.' },
// ];

const AFP_Function_2 = `
    // Withdraws commisions collected by the protocol.
    function withdraw() external;
  `;

const AFP_Function_3 = `
    /**
     * @notice Sends a specific amount of Ether from the protocol's balance to a defined address.
     * @param _addr The address to send the Ether.
     * @param _amount The amount of the Ether.
     */
    function withdrawTo(
        address payable _addr,
        uint256 _amount
    ) external;
`;

const AFP_Function_4 = `
    /**
     * @notice Sets a new implementation for \`AssetInstanceProxy\`.
     * @param _implementation The address of the implementation.
     */
    function setAssetInstanceImplementation(
        address _implementation
    ) external;
`;

const AFP_Function_5 = `
    /**
     * @notice Sets a new \`Asset_Structs.GlobalSettings\` value for \`globalSettings\`.
     * @param _commission_for_privileged The commission for the privileged shareholders.
     * @param _commission_for_protocol The commission for the protocol.
     * @param _min_sell_offer The minimal price per share in a new offer.
     */
    function setGlobalSettings(
        uint24 _commission_for_privileged,
        uint24 _commission_for_protocol,
        uint96 _min_sell_offer
    ) external;
`;


const AFP_Function_6 = `
    /**
     *  @notice Creates the new \`AssetInstanceProxy\` contract.
     *  @param _nameOfAsset The title of the asset.
     *  @param _initialOwners The list of privileged shareholder's names
     *  @param _shareholderAddress The list of privileged shareholder's addresses.
     *  @param _shares The list of shares assigned to each privileged shareholder.
     *  @param _assetHash The hash of the asset.
     */
    function createAssetInstance(
        string calldata _nameOfAsset,
        string[] calldata _initialOwners,
        address[] calldata _shareholderAddress,
        uint24[] calldata _shares,
        bytes32 _assetHash
    ) external;
`;


////////////////////
//  AssetInstanceProxy
////////////////////

const AIP_Function_1 = `
    /// @notice Creates a new \`Asset_Structs.Offer\` for a privileged shareholder.
    /// @param _amount The number of shares to buy in the \`Asset_Structs.Offer\`.
    /// @param _price The price per share in the \`Asset_Structs.Offer\`.
    function makeSellOffer(uint24 _amount, uint96 _price) external;
`;

const AIP_Function_2 = `
    /// @notice Removes the \`Asset_Structs.Offer\` from the \`offers\` array.
    function cancelOffer() external;
`;

const AIP_Function_3 = `
    /// @notice Transfers ownership of the specified number of shares for the price set in the \`Asset_Structs.Offer\`.If the buyer is not a privileged shareholder, a new \`Asset_Structs.Offer\` is created.
    /// @param _from The address of the \`Asset_Structs.Offer\` owner from whom the caller intends to purchase shares.
    /// @param _amount The number of shares to purchase.
    /// @param _sellLimit If the caller is not a privileged shareholder, this value, plus the protocol owner's fee and the privileged shareholders' fee, determines the price of the new \`Asset_Structs.Offer\` created with \`_amount\` of purchased shares and the shares already owned by the caller.
    function buyShares(
        address _from,
        uint24 _amount,
        uint96 _sellLimit
    ) external;
`;

const AIP_Function_4 = `
    /// @notice Distributes the value of \`aggregatedPrivilegedFees\` among privileged shareholders in proportion to the number of shares each holds. Finally, resets \`aggregatedPrivilegedFees\` to zero.
    function payEarndFeesToAllPrivileged() external;
`;


const AIP_Function_5 = `
    /// @notice Withdraws the specified amount of Ether from the caller's balance.
    /// @param _amount The amount of Ether to withdraw.
    function withdraw(uint256 _amount) external;
`;

const AIP_Function_6 = `
    /// @notice Changes the price per share in the \`Asset_Structs.Offer\`. It can be called only by the owner of the \`Asset_Structs.Offer\`.
    /// @param _newLimit The new price per share in the \`Asset_Structs.Offer\`.
    function changeOffer(uint96 _newLimit) external;
`;

const AIP_Function_7 = `
    /// @notice Creates a new \`Asset_Structs.License\`.
    /// @param _licenseHash The hash of the license.
    /// @param _value The amount of Ether that needs to be paid to purchase this license.
    function putNewLicense(
        bytes32 _licenseHash,
        uint224 _value
    ) external;
`;

const AIP_Function_8 = `
    /// @notice Changes the status in the \`Asset_Structs.License\`. Setting the \`active\` parameter to \`true\` enables the purchase of this license.
    /// @param _licenseHash The hash of the license.
    /// @param _activate A boolean parameter that changes the license's status.
    function activateLicense(
        bytes32 _licenseHash,
        bool _activate
    ) external;
`;

const AIP_Function_9 = `
    /// @notice Accepts the amount of Ether specified in an \`Asset_Structs.License\`, creates a new \`Asset_Structs.Payment\` and stores it in the \`payments\` array.
    /// @param _licenseHash The \`hash\` value from the \`Asset_Structs.License\`.
    function signLicense(bytes32 _licenseHash) external;
`;

const AIP_Function_10 = `
    /// @notice Iterates through all eligible payments in the \`payments\` array for a given address and adds the appropriate portion of each \`Asset_Structs.Payment\` to the address's balance.
    /// @param _addr The address for which eligible payment portions are collected.
    function payDividend(address _addr) external;
`;


const devDocs = [
    {
        id: "devdocs-arch", title: "Architecture", content:
            <div className="docs_paragraf">
                <DiagramArchitecture className="rounded-xl p-1" />
            </div>
    },

    { id: "contracts", title: "Contracts", content: <div className="docs_paragraf">All smart contracts used in this protocol are written in solidity 0.8.23. They are deployed on the Optimism network. Optimism is layer 2 solution for etherum blockchain which means that all confirmed transactions on the Optimism network are finally send and saved to the ethereum blockchain. This solution guarantee faster transaction confirmation and lower fees. The drawback is that all transactions need ether that was previously bridged from ethereum mainnet to optimism network.</div> },
    {
        id: "contract_1", title: "AssetFactoryProxy", content:
            <div className="docs_paragraf">

                <div className="pb-2">AssetFactoryProxy is the main contract of the Bananashares protocol. </div>

                <div className="pt-10 pb-2 font-bold">Write functions:</div>
                <CodeBlock code={AFP_Function_1} />
                <div className="pb-2"></div>
                {/* <Table3Columns data={AssetFactoryProxyFunction_1} dataTitles={Titles} /> */}
                <CodeBlock code={AFP_Function_2} />
                <div className="pb-2"></div>
                <CodeBlock code={AFP_Function_3} />
                <div className="pb-2"></div>
                <CodeBlock code={AFP_Function_4} />
                <div className="pb-2"></div>
                <CodeBlock code={AFP_Function_5} />
                <div className="pb-2"></div>
                <CodeBlock code={AFP_Function_6} />
                <div className="pb-2"></div>
            </div>
    },

    {
        id: "contract_2", title: "AssetInstanceProxy", content:
            <div className="docs_paragraf">

                <div className="pb-2">AssetInstanceProxy is the main contract responsible for interacting with a tokenized asset. </div>

                <div className="pt-10 pb-2 font-bold">Write functions:</div>
                <CodeBlock code={AIP_Function_1} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_2} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_3} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_4} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_5} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_6} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_7} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_8} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_9} />
                <div className="pb-2"></div>
                <CodeBlock code={AIP_Function_10} />
                <div className="pb-2"></div>
            </div>
    },

];

interface DocsProps {
    navbarHeight: number;
}

const Docs: React.FC<DocsProps> = ({ navbarHeight }) => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <div className="docs-container">
            <nav className="docs-sidebar">

                {/* <h3 className="text-lg font-bold">Inroduction</h3> */}
                <ul>
                    {intro.map(section => (
                        <li key={section.id}>
                            <button onClick={() => scrollToSection(section.id)} className="block py-2 px-4 hover:bg-gray-200 rounded-xl w-full text-left">
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className="text-lg font-bold">User Docs</h3>
                <ul>
                    {userDocs.map(section => (
                        <li key={section.id}>
                            <button onClick={() => scrollToSection(section.id)} className="block py-2 px-4 hover:bg-gray-200 rounded-xl w-full text-left">
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>

                <h3 className="text-lg font-bold">Governance</h3>
                <ul>
                    {governance.map(section => (
                        <li key={section.id}>
                            <button onClick={() => scrollToSection(section.id)} className="block py-2 px-4 hover:bg-gray-200 rounded-xl w-full text-left">
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>



                <h3 className="text-lg font-bold mt-4">How-To Guides</h3>
                <ul>
                    {howToGuides.map(section => (
                        <li key={section.id}>
                            <button onClick={() => scrollToSection(section.id)} className="block py-2 px-4 hover:bg-gray-200 rounded-xl w-full text-left">
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>



                <h3 className="text-lg font-bold mt-4">Dev Docs</h3>
                <ul>
                    {devDocs.map(section => (
                        <li key={section.id}>
                            <button onClick={() => scrollToSection(section.id)} className="block py-2 px-4 hover:bg-gray-200 rounded-xl w-full text-left">
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="docs-content">
                <div>
                    <h3 className="text-3xl font-bold mb-4">Inroduction</h3>

                    {intro.map(section => (
                        <section id={section.id} key={section.id} className="mb-8">
                            {/* <h2 className="text-xl font-bold mb-4">{section.title}</h2> */}
                            <div>{section.content}</div>
                        </section>
                    ))}
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-4">User Docs</h3>
                    {userDocs.map(section => (
                        <section id={section.id} key={section.id} className="mb-8">
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            <div>{section.content}</div>
                        </section>
                    ))}
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-4">Governance</h3>
                    {governance.map(section => (
                        <section id={section.id} key={section.id} className="mb-8">
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            <div>{section.content}</div>
                        </section>
                    ))}
                </div>

                <div>
                    <h3 className="text-3xl font-bold mb-4">How-To Guides</h3>
                    {howToGuides.map(section => (
                        <section id={section.id} key={section.id} className="mb-8">
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            <div>{section.content}</div>
                        </section>
                    ))}
                </div>
                <div>
                    <h3 className="text-3xl font-bold mb-4">Dev Docs</h3>
                    {devDocs.map(section => (
                        <section id={section.id} key={section.id} className="mb-8">
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            <div>{section.content}</div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Docs;