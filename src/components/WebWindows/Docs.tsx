import React from "react";
import { CodeBlock, Table3Columns, Table4Columns } from "../../components_generic/SimpleCompenents";




const intro = [
    { id: "intro", title: "Inroduction", content: <div>This section explains all aspects of the Bananashares protocol. The documentation is divided into three parts: User Docs, How-To Guides, and Dev Docs. User Docs define all concepts associated with the Songs Marketplace. How-To Guides explain how to use the platform. Dev Docs thoroughly describe the backend of this dapp, focusing on the chosen blockchain technology and details of the smart contracts used in this protocol.</div> },
];

const userDocs = [
    {
        id: "key-concepts", title: "Main Idea", content:
            <div className="docs_paragraf">
                The main idea of this protocol is to enable creators to profit more easily from their work by allowing fans or potential investors to be part of their creation. The mechanism used here guarantees constant liquidity of the shares sold and a constant profit for the creators from trading shares. A creator can also enable purchasing the right to commercial use of their work. The protocol facilitates the distribution of any income from licensing to all shareholders. To use all these features, all you need is an active crypto wallet. There is no need for account creation, logging in, or signing in. The security of all transactions is guaranteed by the Ethereum Blockchain and Optimism network.
            </div>
    },
    {
        id: "key-actors", title: "Key Actors", content:
            <div className="docs_paragraf">
                Four types of platform users can be distinguished: Privileged Shareholder, Normal Shareholder, License Purchaser, and Song Smart Contract Creator.
                <div className="py-2">
                    <span className="font-bold">Privileged Shareholder</span> - is the owner of the address placed in the song tokenization form. They are the original owners of a song. At the moment of song smart contract creation, all shares must be distributed by the Song Smart Contract Creator to all Privileged Shareholders. Each Privileged Shareholder, regardless of the number of shares held, has the right to upload a hash of a License, and deactivate or activate it if necessary. They can sell their shares by creating an offer, changing an offer, or canceling an offer at any time. They can buy any shares available in the offer list, and upon a successful purchase, the protocol does not create a new sell offer from the bought shares, unlike for Normal Shareholders.
                </div>
                <div className="py-2">
                    <span className="font-bold">Normal Shareholder</span> - is any address that purchased any share from any offer from the list of offers and does not belong to any Privileged Shareholder. In the process of buying shares, they are required to specify a price they are willing to sell their shares for, because a new sell offer is created with their freshly bought shares. They can change the sell price at any moment but cannot cancel the offer, unlike Privileged Shareholders.
                </div>
                <div className="py-2">
                    <span className="font-bold">Licence Purchaser</span> - is the owner of an address that makes a payment in ether as described in a License.
                </div>
                <div className="py-2">
                    <span className="font-bold">Song Smart Contract Creator</span> - is the owner of an address that sends a transaction for the song tokenization. This is their only role in this app. They don't become a Privileged Shareholder unless their address is placed in the tokenization form as a Privileged Shareholder.
                </div>
            </div>
    },
    {
        id: "song-tokenization", title: "Song Tokenization", content:
            <div className="docs_paragraf">
                Song tokenization is a process that requires filling out the song tokenization form. The result of this process is the creation of a new Song Smart Contract that handles most of features of this protocol. If the process is successfully completed, you will receive a Song Smart Contract address. It is crucial to save this address and share it with your community to enable anyone interested to interact with the smart contract of your song through this dapp. The most important part of the tokenization process is uploading your terms of use and the audio file of your song. The terms of use document describes how you understand transferring ownership of your song into shares, your rights and obligations, and all that is enabled by the smart contracts. The protocol creates a hexadecimal hash out of those files and saves it on the blockchain. These files should be shared with anyone interested so they can compare them with the hash saved on the blockchain, ensuring that users are interacting with the correct smart contract.
            </div>
    },

    {
        id: "song-smartcontract", title: "Song Smart Contract", content:
            <div className="docs_paragraf">
                A Song Smart Contract is a piece of code written in Solidity containing all variables and functions. These variables specify information about the song, shares distribution, balances, etc. Functions enable changing the state of these variables. More information can be found in the Dev Docs section.
            </div>
    },

    {
        id: "song-shares", title: "Song Shares", content:
            <div className="docs_paragraf">
                A Song Smart Contract has a fixed total amount of shares that must be distributed to all shareholders. This total amount is 1,000,000 shares. Each share gives the right to a proportional part of the ethers paid for a license by a License Purchaser. Specific rights and obligations of a shareholder can be specified in a document used in the Song Tokenization process by the Song Smart Contract Creator. A Privileged Shareholder holds at least one share at the moment of Song Smart Contract creation. If a user wants to become a Normal Shareholder, they need to purchase at least one share from an offer.
            </div>
    },
    {
        id: "offers", title: "Offers", content:
            <div className="docs_paragraf">
                An offer consists of three elements: the address of the offer owner, the number of shares, and the price the owner is willing to sell them for. All offers are displayed in the list of offers. To use an offer to buy shares, certain restrictions must be fulfilled. If a buyer already has some shares and there was a payment for a license, they must first collect all their dividends. If the owner of an Ooffer has any dividends or fees to collect, the buyer must collect those dividends or fees in the name of the owner before they can buy any shares. Alternatively, the buyer can wait for the owner to collect their fees or dividends.
            </div>
    },

    {
        id: "licenses", title: "Licenses", content:
            <div className="docs_paragraf">
                A license is a hash of a document that contains the conditions for the commercial use of a song. The license must also specify the price for use in Ether. Any Privileged Shareholder can upload a license to the Song Smart Contract and activate or deactivate it. A deactivated license is not visible to any users. Privileged Shareholders should share this document with anyone who wants to read the terms of use and compare the hash of the document with the hash uploaded to the Song Smart Contract.
            </div>
    },

    {
        id: "incomes", title: "Incomes", content:
            <div className="docs_paragraf">
                <div>
                    Privileged Shareholders can profit from three sources: selling their shares, dividends from selling licenses, and fees paid by anyone who buys shares from an offer created by a Normal Shareholder.
                </div>
                <div>
                    Normal Shareholders can profit from two sources: selling their shares and dividends from selling licenses.
                </div>
                <div>
                    To withdraw ether, you need to have your income placed in your balance. When somebody buys your shares, the paid ether is saved directly to your balance. When somebody buys a license, a payment is saved as a whole in the Song Smart Contract. This means that each payment is an independent entity and is not distributed automatically. To get your part saved in your balance, you need to collect it yourself or by anyone who wants to buy your shares. The similar role applies to fees for Privileged Shareholders. They are initially saved as a whole for all Privileged Shareholders. To be saved in each Privileged Shareholder's balance, they need to be collected.
                </div>
            </div>
    },

    {
        id: "fees", title: "Fees", content:
            <div className="docs_paragraf">
                There are two types of fees: fees paid to Privileged Shareholders and fees paid to the protocol. When a Privileged Shareholder creates an offer, they need to specify the price per share. When sending the offer, the smart contract adds 1% of this price to the final price per share as a fee for the protocol. When a Normal Shareholder creates an offer, which happens immediately after buying any shares, the protocol adds 1% as a fee for the protocol and 5% as a fee for all Privileged Shareholders. In other words, the fees for any buy/sell transaction of shares are 1% if an offer is created by a Privileged Shareholder or 6% if an offer is created by a Normal Shareholder. There are no other fees.
            </div>
    },

];

const howToGuides = [
    {
        id: "application", title: "How to use this dapp", content:
            <div className="docs_paragraf">
                To use this dapp you need an active Metamask or Coinbase wallet. All transactions are made on the Optimism network, which means you need to transfer the proper amount of ether from the Ethereum mainnet to the Optimism mainnet using an adequate bridge protocol. Choose the MARKETPLACE tab and click connect to connect this site with your wallet. If your wallet is connected to a different network than Optimism by default, you will be prompted to change the network, which you should accept. After a successful connection, the MARKETPLACE tab should display two options: TOKENIZE YOUR SONG and CONNECT TO THE SONG. If you are a creator who wants to tokenize a song, choose the first option. If you are a creator or a common user who wants to interact with the Song Smart Contract, choose the second option.
            </div>
    },
    {
        id: "tokenization", title: "How to tokenize a song", content:
            <div className="docs_paragraf">
                To tokenize your song, you need to fill out the form in the TOKENIZE YOUR SONG option of the MARKETPLACE tab. The form consists of a few fields: the title of the song, the list of Privileged Shareholders, and the song hash. Initially, there is only one position in the list of Privileged Shareholders. This list can be expanded up to 10 positions. Each position in the list of Privileged Shareholders consists of four elements: the name, the role description, the number of shares, and the address. The address is a hexadecimal number of a crypto account of a future Privileged Shareholder. The hash of a song is a 32-byte long hexadecimal number that serves as proof that this is your song. To create the hash of a song, you need to have a special document or audio file of your song or both of them. This special document can be prepared in the form of an agreement written by a lawyer or another specialist in which you can specify the detailed rights of Privileged and Normal Shareholders. After all, one of these files or both of them, it depends on you, need to be uploaded to this platform. Next, you just need to choose the HASH FILES button to start the hashing method. In the process, each uploaded file is encoded into a base32 string, and those base32 strings are finally put into the hashing function. At the end of the hashing function, one or both encoded files will be downloaded to your disk. It is crucial to save those files and share them with the community so anyone can use those files to hash them again and compare this hash with the hash saved on the Song Smart Contract of your song. This is the way to confirm that the Song Smart Contract represents your song. We use the base32 string format to ensure that the content of those files will not change during various operations like saving, copying, or downloading. This is because changing only one letter in those files will totally change the hash. After filling in all positions, hit the TOKENIZE button, confirm the transaction in your crypto wallet, and wait for the response from the network. After a successful transaction, you will receive an address of your Song Smart Contract. Save this file and be sure you never lose it because all users will need to use this address to connect and interact with your Song Smart Contract.
            </div>
    },
    {
        id: "connect-to-song", title: "How to connect to a Song Smart Contract", content:
            <div className="docs_paragraf">
                To connect to a song, find the address of this song. The Song Smart Contract Creator or any Privileged Shareholder should share this address with everyone on their website or social media accounts. Next, paste this address into the form in the CONNECT TO THE SONG option of the MARKETPLACE and click 'Try to connect'. If the address is correct, you should be forwarded to the song panel.
            </div>
    },
    {
        id: "selling", title: "How to sell my Shares", content:
            <div className="docs_paragraf">
                <div>
                    If you are a Privileged Shareholder, to sell your shares, you need to connect to your song in the CONNECT TO THE SONG option and click 'Make Sell Offer'. A window should appear where you can specify the number of shares you want to sell and the price you want to get for any of your shares. When you are ready, click 'Submit' and confirm the transaction in your crypto wallet to send the transaction.
                </div>
                <div>
                    If you are a Normal Shareholder, you have no option of creating any sell offers because any shares you bought are automatically put into a new sell offer. A Normal Shareholder needs to accept that their shares are always available for purchase.
                </div>
            </div>
    },
    {
        id: "cancel-an-offer", title: "How to cancel my Offer", content:
            <div className="docs_paragraf">
                <div>
                    If you are a Privileged Shareholder, you can cancel your offer in the Additional Options by clicking the 'Cancel Offer' button. A window should appear where you can confirm your decision.
                </div>
                <div>
                    If you are a Normal Shareholder, you cannot cancel your offer.
                </div>
            </div>
    },
    {
        id: "change-an-offer", title: "How to change my Offer", content:
            <div className="docs_paragraf">
                <div>
                    If you are a Privileged Shareholder, you can change your offer in the Additional Options by clicking the 'Change Offer' button. A window should appear where you can specify the new number of shares and the new price per share. When you are ready, you can confirm your decision by clicking 'Submit'.
                </div>
                <div>
                    If you are a Normal Shareholder, you can change your offer in the Additional Options by clicking the 'Change Offer' button. A window should appear where you can specify only the new price per share. You cannot change the number of shares in your offer.
                </div>
            </div>
    },
    {
        id: "buying", title: "How to buy shares", content:
            <div className="docs_paragraf">
                To buy a share, you need to choose an offer from the list of offers.
                <div>
                    If you are a Privileged Shareholder, a window should appear where you can specify the number of shares you want to buy. If you are a Normal Shareholder, additionally in this window, there will be a place to specify the price you will be willing to sell them because the protocol will automatically create a new sell offer out of your shares.
                </div>
                <div>
                    There could be a situation where the 'Buy shares' button in the list of offers is not active. This could happen when you, as a user, have a dividend and/or fees if you are a Privileged Shareholder to collect. The other situation is when the owner of an offer has a dividend and/or fees to collect. When one or both of these situations occur, you need to collect those dividends and fees, for yourself and/or for the owner of the offer, to enable the 'Buy shares' button.
                </div>
            </div>
    },
    {
        id: "place-license", title: "How to upload a License", content:
            <div className="docs_paragraf">
                <div>
                    To upload a License, you need to be a Privileged Shareholder. Click the 'Upload new license' button. A window should appear where you need to specify the value in ether a License Purchaser needs to pay to get the specific rights to the song and upload a file that contains the content of this license. Prepare a license in the form of a file in the .txt or .md format that contains specific license conditions. In the upload a license window, click 'Upload File' and choose this file. Like in the tokenization process, this uploaded file is encoded into a base32 string and this base32 string is put into the hashing function. The resulting hash will then be placed into the Song Smart Contract to become the basis to recognize and confirm the specific License. Upon successful hashing, you will receive this base32 string in the form of a .txt file to save. The base32 string file should be shared with any potential License Purchaser. This way, a License Purchaser can be familiar with the content of a License and be able to compare the hash saved on the Song Smart Contract with the hash created with the shared base32 string file.
                </div>
                <div>
                    As a Privileged Shareholder, you have the option to activate and deactivate a license. Deactivating a license means that all users will not see this license in the list of licenses. You can activate it to move it back to this list.
                </div>
            </div>
    },
    {
        id: "sign-license", title: "How to buy a License", content:
            <div className="docs_paragraf">
                Buying a license means that an owner of an address sends an amount of ether assigned to this license. In return, they gain the rights described in the license. To do this, first check if there are any active licenses in the licenses section of the CHECK A SONG option. If there is, choose the hash of the license you want to buy. You can check the hash and the content of this license by taking the base32 string file of this license from the source shared by the Privileged Shareholder who uploaded it. Click 'Check License' and upload the base32 string file. Then you can hash it and compare the given hash with the hash you chose. You can also retrieve the original content of the base32 string file by clicking the 'Retrieve content' button. This option decodes this file and shows the original content in a human-readable form. When you are sure which license you want to buy, click 'Sign License' and confirm the transaction in your crypto wallet.
            </div>
    },
    {
        id: "collect-income", title: "How to collect my income", content:
            <div className="docs_paragraf">
                Collecting income means that you get your share of the license payment or fees for trade and save that share in your balance on the Song Smart Contract. Withdrawing means taking all the Ether stored in the balance and sending it from the Song Smart Contract to the cryptocurrency wallet address assigned to that balance. If you have any Ether to collect on the Song Smart Contract, in the additional options section, there should appear 'You have dividends to collect' (if there was a payment for a license) or 'You have fees to collect' (if you are a Privileged Shareholder and there was a transaction of buying a Normal Shareholder's offer). To collect this Ether, just click 'Collect' and confirm the transaction in your crypto wallet.
                <div>
                    Finally, if there is any Ether in your balance, there should appear the sign: 'You can withdraw:...' and the button 'Withdraw'. Click it to send this Ether to your crypto wallet.
                </div>
            </div>
    },
];


const Titles = [
    'Type', 'Name', 'Description'
];

const EventTitles = [
    'Type', 'Indexed', 'Name', 'Description'
];


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
//  SongsMarketplace
////////////////////

const SongsMarketplaceStateVariables = [
    { column1: 'mapping(address => string)', column2: 'collectionOfSongs', column3: 'Associates each Song address with a title of a tokenized song.' },
    { column1: 'mapping(address => bytes32)', column2: 'collectionOfSongsHashes', column3: 'Associates each Song address with a hash of a tokenized song.' },
    { column1: 'mapping(bytes32 => address)', column2: 'collectionOfSongsByHash', column3: 'Associates each hash of a tokenized song with a Song address.' },
    { column1: 'address', column2: 'owner', column3: 'Address of EOA that creates SongCore and SongsMarketplace smart contracts.' },
    { column1: 'address', column2: 'songCore', column3: 'Address that contains implementations of all write functions for Song Smart Sontract.' },
];

const SM_Event_1 = `
event SongCreated(
    address indexed songCreator,
    address indexed songAddress,
    string nameOfSong
);
  `;

const SongsMarketplaceEvent_1 = [
    { column1: 'address', column2: 'True', column3: 'songCreator', column4: 'Address that sends createSong transaction.' },
    { column1: 'address', column2: 'True', column3: 'songAddress', column4: 'Address of already created Song Smart Contract.' },
    { column1: 'string', column2: 'False', column3: 'nameOfSong', column4: 'The title of a tokenized song.' },
];

const SM_Event_2 = `
event ContractCreationFailure(
    address indexed songCreator,
    string reason
);
  `;

const SongsMarketplaceEvent_2 = [
    { column1: 'address', column2: 'True', column3: 'songCreator', column4: 'Address that sends createSong transaction.' },
    { column1: 'string', column2: 'False', column3: 'reason', column4: 'The reason of the error.' },
];

const SM_Function_1 = `
    // Creates a Song Smart Contract out of provided data.
    function createSong(
        string calldata _nameOfSong,
        string[] calldata _authors,
        address[] calldata _shareholderAddress,
        uint24[] calldata _shares,
        bytes32 _songHash
    ) external;
  `;

const SongsMarketplaceFunction_1 = [
    { column1: 'string', column2: '_nameOfSong', column3: 'The title of a song.' },
    { column1: 'string[]', column2: '_authors', column3: 'The list of Privileged Shareholders.' },
    { column1: 'address[]', column2: '_shareholderAddress', column3: 'The list of addresses for each Privileged Shareholder.' },
    { column1: 'uint24[]', column2: '_shares', column3: 'The list of shares each Privileged Shareholder will hold.' },
    { column1: 'bytes32', column2: '_songHash', column3: 'The hash of a song.' },
];

const SM_Function_2 = `
    // Withdraws commisions collected by the protocol.
    function withdraw() external;
  `;

////////////////////
//  Song
////////////////////

const S_Struct_1 = `
    struct Author {
        string name;
    }
  `;
const SongStruct_1 = [
    { column1: 'string', column2: 'name', column3: 'The name of a Privileged Shareholder. This variable has only descriptive meaning.' },
];

const S_Struct_2 = `
    struct Offer {
        address from;
        uint96 value;
        uint96 ownerFee;
        uint96 privilegedFee;
        uint24 amount;
    }
  `;
const SongStruct_2 = [
    { column1: 'address', column2: 'from', column3: 'The address of the offer\'s owner.' },
    { column1: 'uint96', column2: 'value', column3: 'The base price for a share set by the owner of an offer.' },
    { column1: 'uint96', column2: 'ownerFee', column3: 'The value added to the base price for a share as a fee for the protocol.' },
    { column1: 'uint96', column2: 'privilegedFee', column3: 'The value added to the base price for a share as a fee for the Provileged Shareholders.' },
    { column1: 'uint24', column2: 'amount', column3: 'Number of shares to sell in the offer.' },
];

const S_Struct_3 = `
    struct Payment {
        bytes32 licenseHash;
        uint224 paymentValue;
        uint32 date;
        address payer;
    }
  `;
const SongStruct_3 = [
    { column1: 'bytes32', column2: 'licenseHash', column3: 'The hash of a license.' },
    { column1: 'uint224', column2: 'paymentValue', column3: 'The value in Ether that was paid to purchase a License.' },
    { column1: 'uint32', column2: 'date', column3: 'The date when a Payment was created.' },
    { column1: 'address', column2: 'payer', column3: 'The address that made a Payment.' },
];

const S_Struct_4 = `
    struct License {
        bytes32 licenseHash;
        uint224 value;
        bool active;
    }
  `;
const SongStruct_4 = [
    { column1: 'bytes32', column2: 'licenseHash', column3: 'The hash of a license.' },
    { column1: 'uint224', column2: 'value', column3: 'The value in Ether that needs to paid to purchase a license.' },
    { column1: 'bool', column2: 'active', column3: 'The switch that indicates if a license is availabe to purchase. If active is set to True a License is placed in the list of active Licenses.' },
];

const SongStateVariables = [
    { column1: 'uint256', column2: '_status', column3: 'Slot used by ReentrancyGuard.' },
    { column1: 'string', column2: 'nameOfSong', column3: 'The title of the song.' },
    { column1: 'bytes32', column2: 'songHash', column3: 'The hash of the song.' },
    { column1: 'Author[]', column2: 'authors', column3: 'The list of names of Privileged Shareholders.' },
    { column1: 'mapping(address => uint24)', column2: 'shares', column3: 'Associates each shareholder address with number of shares they hold.' },
    { column1: 'uint24', column2: 'sharesInPrivilegedHands', column3: 'The total number of shares held by Privileged Shareholders, which is the total number of shares less the number of shares held by Normal Shareholders.' },
    { column1: 'mapping(address => uint24)', column2: 'privilegedShareholdersIndex', column3: 'Assigns each Privileged Shareholder\'s address an index under which it can be found in the list of privilegedShareholders.' },
    { column1: 'address[]', column2: 'privilegedShareholders', column3: 'The list of Privileged Shareholders addresses' },
    { column1: 'mapping(address => uint24)', column2: 'offersIndex', column3: 'Assigns each Shareholder\'s address an index under which the Shareholder\'s offer can be found in the list of offers.' },
    { column1: 'Offer[]', column2: 'offers', column3: 'The list of offers.' },
    { column1: 'mapping(bytes32 => uint256)', column2: 'licensesIndex', column3: 'Assigns each license\'s hash an index under which it can be found in the list of licenses.' },
    { column1: 'License[]', column2: 'licenses', column3: 'The list of licenses.' },
    { column1: 'mapping(uint32 => uint256)', column2: 'paymentIndex', column3: 'Assigns each date when a Paymant was made an index under which this Payment can be found in the list of payments.' },
    { column1: 'mapping(address => uint32)', column2: 'lastDayOfDividendPayment', column3: 'Associates each shareholder\'s address with a Payment date. The next Payment after that date will be the Payment to which the shareholder will be entitled.' },
    { column1: 'Payment[]', column2: 'payments', column3: 'The list of all Payments.' },
    { column1: 'uint256', column2: 'aggregatedPrivilegedFees', column3: 'This variable represents the sum of all fees gathered, which are designated for distribution among Privileged Shareholders. Upon invoking the `payEarndFeesToAllPrivileged` function, the accumulated fees are distributed proportionally to all Privileged Shareholders, and the value of this variable is reset to zero.' },
    { column1: 'mapping(address => uint256)', column2: 'balances', column3: 'Assigns each address that used this platform a value that represents colected income from any sources: sold shares, dividend from licenses, fees for Proivileged Shareholders. This value is ready to be withdrawn from this smart contract.' },
    { column1: 'mapping(address => bool)', column2: 'whiteList', column3: 'This mapping assigns the address of the Song smart contract to true. This solution allows songCore to be used as a library for a Song Smart Contract.' },
    { column1: 'address', column2: 'songCore', column3: 'Holds the address of songCore contract, which is used as a library for write functions in each Song Smart Contract.' },
];



const S_Event_0 = `
    event SharesBought(
        address indexed from,
        uint256 value,
        address indexed to,
        uint256 amount
    );
`;

const SongEvent_0 = [
    { column1: 'address', column2: 'True', column3: 'from', column4: 'The address of the offer\'s owner.' },
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'The prize per share in the offer.' },
    { column1: 'address', column2: 'True', column3: 'to', column4: 'The address of the user that bought the shares.' },
    { column1: 'uint256', column2: 'False', column3: 'amount', column4: 'The number of shares bought in the transaction.' },
];



const S_Event_1 = `
    event SellOfferPut(
        address indexed from, 
        uint256 amount, 
        uint256 value
    );
`;

const SongEvent_1 = [
    { column1: 'address', column2: 'True', column3: 'from', column4: 'The address of the Privileged Shareholder who created the offer.' },
    { column1: 'uint256', column2: 'False', column3: 'amount', column4: 'The amount of shares that are for sale.' },
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'The price for each share in this offer.' },

];

const S_Event_2 = `
    event OfferCancelled(
        address indexed from
    );
`;

const SongEvent_2 = [
    { column1: 'address', column2: 'True', column3: 'from', column4: 'Address of the Privileged Shareholder that cancelled the offer.' },
];

const S_Event_3 = `
    event Withdrawal(
        address indexed user, 
        uint256 amount
    );
`;

const SongEvent_3 = [
    { column1: 'address', column2: 'True', column3: 'user', column4: 'Address of the user who decided to withdraw their Ether.' },
    { column1: 'uint256', column2: 'False', column3: 'amount', column4: 'Amount of Ether that has been withdrawn.' },
];

const S_Event_4 = `
    event OfferChanged(
        address indexed from, 
        uint256 value
    );
`;

const SongEvent_4 = [
    { column1: 'address', column2: 'True', column3: 'from', column4: 'Address of the shareholder that decided to change their offer.' },
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'New Price for each share in the offer.' },
];

const S_Event_5 = `
    event DividendPaid(
        address indexed holder,
        uint256 value,
        uint256 numberOfPayments
    );
`;

const SongEvent_5 = [
    { column1: 'address', column2: 'True', column3: 'holder', column4: 'Address of the shareholder that collects thier share in the Payments for licenses.' },
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'Accumulated Ether from the Payments for the address.' },
    { column1: 'uint256', column2: 'False', column3: 'numberOfPayments', column4: 'Number of Payments from which the divident have been collected.' },
];

const S_Event_6 = `
    event DividendPaidOnlyPartly(
        address indexed holder,
        uint256 value,
        uint256 numberOfPaymentsLeft
    );
`;

const SongEvent_6 = [
    { column1: 'address', column2: 'True', column3: 'holder', column4: 'Address of the shareholder that collects thier share in the Payments for licenses.' },
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'Accumulated Ether from the payments before the function had to be halted due to lack of gas.' },
    { column1: 'uint256', column2: 'False', column3: 'numberOfPaymentsLeft', column4: 'Number of payments from which the user has still dividends to be collected.' },
];

const S_Event_7 = `
    event EarndFeesToAllPrivileged(
        uint256 value
    );
`;

const SongEvent_7 = [
    { column1: 'uint256', column2: 'False', column3: 'value', column4: 'The value in Ether that has been paid proportionally to each Privileged Shareholder as a fee for trading shares.' },
];

const S_Event_8 = `
    event GasLimitTooLow();
`;

const SongEvent_8 = [
    { column1: '-', column2: '-', column3: '-', column4: '-' },
];

const S_Event_9 = `
    event NewLicenseCreated(address indexed creator);
`;

const SongEvent_9 = [
    { column1: 'address', column2: 'True', column3: 'creator', column4: 'Address of the Privileged Shareholder that saves a new license.' },
];

const S_Event_10 = `
    event LicenseDeactivated(
        address indexed remover, 
        bytes32 licenseHash
    );
`;

const SongEvent_10 = [
    { column1: 'address', column2: 'True', column3: 'remover', column4: 'Address of the Privileged Shareholder that changed active status of the Licenses to false.' },
    { column1: 'bytes32', column2: 'False', column3: 'licenseHash', column4: 'Hash of the deactivated license.' },
];

const S_Event_11 = `
    event LicenseActivated(
        address indexed activator, 
        bytes32 licenseHash
    );
`;

const SongEvent_11 = [
    { column1: 'address', column2: 'True', column3: 'activator', column4: 'Address of the Privileged Shareholder that changed active status of the licenses to true.' },
    { column1: 'bytes32', column2: 'False', column3: 'licenseHash', column4: 'Hash of the activated license.' },
];

const S_Event_12 = `
    event NewPayment(
        address indexed payer, 
        bytes32 licenseHash
    );
`;

const SongEvent_12 = [
    { column1: 'address', column2: 'True', column3: 'payer', column4: 'Address of the user that creates a new Payment for the license.' },
    { column1: 'bytes32', column2: 'False', column3: 'licenseHash', column4: 'The hash of the bought license.' },
];


const S_Event_x = `
    xxx
`;

const SongEvent_x = [
    { column1: 'xxx', column2: 'True', column3: 'xxx', column4: '' },
    { column1: 'xxx', column2: 'False', column3: 'xxx', column4: '' },
];

const S_Function_1 = `
    // Creates a new Offer.
    function makeSellOffer(
        uint24 _amount,
        uint96 _price
    ) external;
  `;

const SongFunction_1 = [
    { column1: 'uint24', column2: '_amount', column3: 'Number of shares to buy in the offer.' },
    { column1: 'uint96', column2: '_price', column3: 'The price per share in the offer.' },
];

const S_Function_2 = `
    // Removes the offer from the list of offers.
    function cancelOffer() external;
  `;

const SongFunction_2 = [
    { column1: '-', column2: '-', column3: '-' },
];

const S_Function_3 = `
    // Gives ownership of the number of shares for the price specified in the offer and creates a new offer if the buyer is not a Privileged Shareholder.
    function buyShares(
        address _from,
        uint24 _amount,
        uint96 _sellLimit
    ) external payable;
  `;

const SongFunction_3 = [
    { column1: 'address', column2: '_from', column3: 'Address of the offer owner from whom the caller of this method intends to purchase shares.' },
    { column1: 'uint24', column2: '_amount', column3: 'Number of shares to purchase.' },
    { column1: 'uint96', column2: '_sellLimit', column3: 'If the caller of this method is not a Privileged Shareholder this, plus fee for protocol owner, plus fee for Privileged Shareholders is the price of a new offer created with _amount of bought shares and amount of shares already in hand of the method caller.' },
];

const S_Function_4 = `
    // Takes the aggregatedPrivilegedFees storage value and stores a portion of that value proportional to the balance of each Privileged Shareholder. Finally, leaves aggregatedPrivilegedFees with zero.
    function payEarndFeesToAllPrivileged() external;
  `;

const SongFunction_4 = [
    { column1: '-', column2: '-', column3: '-' },
];

const S_Function_5 = `
    // Withdraws the specified amount of Ether saved on the caller balance.
    function withdraw(uint256 _amount) external;
  `;

const SongFunction_5 = [
    { column1: 'uint256', column2: '_amount', column3: 'The value in Ether that is going to be withdrawn.' },
];

const S_Function_6 = `
    // Changes the price for a share in the offer. It can be called only by the owner of the offer.
    function changeOffer(
        uint96 _newLimit
    ) external;
  `;

const SongFunction_6 = [
    { column1: 'uint96', column2: '_newLimit', column3: 'New price for a share in the offer.' },
];

const S_Function_7 = `
    // Creates a new license.
    function putNewLicense(
        bytes32 _licenseHash, 
        uint224 _value
    ) external;
  `;

const SongFunction_7 = [
    { column1: 'bytes32', column2: '_licenseHash', column3: 'The hash of the license.' },
    { column1: 'uint224', column2: '_value', column3: 'The value in Ether that needs to be paid to purchase this license.' },
];

const S_Function_8 = `
    // Changes the status of the license. Setting the active parameter to true allows you to purchase this license.
    function activateLicense(
        bytes32 _licenseHash,
        bool _activate
    ) external
  `;

const SongFunction_8 = [
    { column1: 'bytes32', column2: '_licenseHash', column3: 'The hash of the license.' },
    { column1: 'bool', column2: '_activate', column3: 'Parameter changing the license status.' },
];

const S_Function_9 = `
    // Buys the license by making a new Payment.
    function signLicense(
        bytes32 _licenseHash
    ) external payable;
  `;

const SongFunction_9 = [
    { column1: 'bytes32', column2: '_licenseHash', column3: 'The hash of the license.' },
];

const S_Function_10 = `
    // Iterates through all payments eligible for the address and adds the appropriate portion of each payment to the address's balance.
    function payDividend(
        address _addr
    ) external;
  `;

const SongFunction_10 = [
    { column1: 'address', column2: '_addr', column3: 'The address for which this method collects the eligible portions of the payments.' },
];

const SongCoreModifier = `
    modifier onlyAuthorized(address caller) {
        require(whiteList[caller], "Caller is not authorized");
        _;
    }
    `;


const SongCoreFunction = `
    // Song external function example 
    function exampleFunction(
        uint _exampleParam
    ) external;
    
    // SongCore external function example 
    function exampleFunction(
        uint _exampleParam,
        address _caller
    ) external onlyAuthorized(_caller);

    // Real life example.
    // Song makeSellOffer function:
    function makeSellOffer(uint24 _amount, uint96 _price) external {
        (bool success, ) = songCore.delegatecall(
            abi.encodeWithSignature(
                "makeSellOffer(uint24,uint96,address)",
                _amount,
                _price,
                address(this)
            )
        );
        require(success);
    }

    // SongCore makeSellOffer function:
    function makeSellOffer(
        uint24 _amount,
        uint96 _price,
        address _caller
    ) external onlyAuthorized(_caller) {
    // implementation
    };
    `;


const devDocs = [
    { id: "contracts", title: "Contracts", content: <div className="docs_paragraf">All smart contracts used in this protocol are written in solidity 0.8.23. They are deployed on the Optimism network. Optimism is layer 2 solution for etherum blockchain which means that all confirmed transactions on the Optimism network are finally send and saved to the ethereum blockchain. This solution guarantee faster transaction confirmation and lower fees. The drawback is that all transactions need ether that was previously bridged from ethereum mainnet to optimism network.</div> },
    {
        id: "contract_1", title: "SongsMarketplace", content:
            <div className="docs_paragraf">

                <div className="pb-2">SongsMarketplace is a smart contract responsible for creating new Song Smart Contracts. </div>
                <div className="pt-10 pb-2 font-bold">State variables:</div>
                <Table3Columns data={SongsMarketplaceStateVariables} dataTitles={Titles} />

                <div className="pt-10 pb-2 font-bold">Events:</div>
                <CodeBlock code={SM_Event_1} />
                <div className="pb-2"></div>
                <Table4Columns data={SongsMarketplaceEvent_1} dataTitles={EventTitles} />
                <div className="pb-2"></div>
                <CodeBlock code={SM_Event_2} />
                <div className="pb-2"></div>
                <Table4Columns data={SongsMarketplaceEvent_2} dataTitles={EventTitles} />


                <div className="pt-10 pb-2 font-bold">Write functions:</div>
                <CodeBlock code={SM_Function_1} />
                <div className="pb-2"></div>
                <Table3Columns data={SongsMarketplaceFunction_1} dataTitles={Titles} />
                <CodeBlock code={SM_Function_2} />
                <div className="pb-2"></div>

            </div>
    },

    {
        id: "contract_2", title: "Song", content:
            <div className="docs_paragraf">
                <div className="pb-2">Song is a smart contract responsible for storing all data related to shares, shareholders, licenses, sales offers, accessing this data and delegating write functions to the SongCore smart contract.</div>

                <div className="pt-10 pb-2 font-bold">Structs:</div>
                <CodeBlock code={S_Struct_1} />
                <div className="pb-2"></div>
                <Table3Columns data={SongStruct_1} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Struct_2} />
                <div className="pb-2"></div>
                <Table3Columns data={SongStruct_2} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Struct_3} />
                <div className="pb-2"></div>
                <Table3Columns data={SongStruct_3} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Struct_4} />
                <div className="pb-2"></div>
                <Table3Columns data={SongStruct_4} dataTitles={Titles} />
                <div className="pb-4"></div>

                <div className="pt-10 pb-2 font-bold">State variables:</div>
                <Table3Columns data={SongStateVariables} dataTitles={Titles} />

                <div className="pt-10 pb-2 font-bold">Events:</div>
                <CodeBlock code={S_Event_0} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_0} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_1} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_1} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_2} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_2} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_3} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_3} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_4} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_4} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_5} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_5} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_6} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_6} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_7} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_7} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_8} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_8} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_9} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_9} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_10} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_10} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_11} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_11} dataTitles={EventTitles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Event_12} />
                <div className="pb-2"></div>
                <Table4Columns data={SongEvent_12} dataTitles={EventTitles} />
                <div className="pb-4"></div>


                <div className="pt-10 pb-2 font-bold">External write functions:</div>
                <CodeBlock code={S_Function_1} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_1} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_2} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_2} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_3} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_3} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_4} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_4} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_5} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_5} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_6} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_6} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_7} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_7} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_8} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_8} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_9} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_9} dataTitles={Titles} />
                <div className="pb-4"></div>
                <CodeBlock code={S_Function_10} />
                <div className="pb-2"></div>
                <Table3Columns data={SongFunction_10} dataTitles={Titles} />
            </div>
    },
    {
        id: "contract_3", title: "SongCore", content:
            <div className="docs_paragraf">
                <div className="pb-2">
                    SongCore serves as a dictionary for any Song Smart Contract, containing the same structure of state variables, structs, and events. The primary distinction is that all external functions in SongCore include an additional address caller parameter, representing the address of the Song Smart Contract. This parameter is used in a modifier applied to all external functions. The main role of this modifier is to resctict utility of this smart contract to only delegate calls.</div>
                <div className="pb-4"></div>
                <CodeBlock code={SongCoreModifier} />

                <div className="pt-10 pb-2 font-bold">External write functions:</div>

                <CodeBlock code={SongCoreFunction} />

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