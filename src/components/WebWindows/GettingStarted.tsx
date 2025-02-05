import React, { useRef } from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { ContentsButton } from "../../components_generic/Button";
import InfoRevealer from "../../components_generic/InfoRevealer";
import { TOTAL_SUPLY } from "../../utility/Globals";

interface GettingStartedProps {
    navbarHeight: number;
}

const GettingStarted: React.FC<GettingStartedProps> = ({ navbarHeight }) => {
    const _0_ref = useRef<HTMLDivElement>(null);
    const _1_ref = useRef<HTMLDivElement>(null);
    const _2_ref = useRef<HTMLDivElement>(null);
    const _3_ref = useRef<HTMLDivElement>(null);
    const _4_ref = useRef<HTMLDivElement>(null);
    const _5_ref = useRef<HTMLDivElement>(null);
    const _6_ref = useRef<HTMLDivElement>(null);
    const _7_ref = useRef<HTMLDivElement>(null);

    const scrollToSection = (section: number) => {
        let element: HTMLElement | null = null;
        switch (section) {
            case 0:
                element = _0_ref.current;
                break;
            case 1:
                element = _1_ref.current;
                break;
            case 2:
                element = _2_ref.current;
                break;
            case 3:
                element = _3_ref.current;
                break;
            case 4:
                element = _4_ref.current;
                break;
            case 5:
                element = _5_ref.current;
                break;
            case 6:
                element = _6_ref.current;
                break;
            case 7:
                element = _7_ref.current;
                break;
            default:
                break;
        }

        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight + 50;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const titles = [
        "Prerequisites", //0
        "An asset manifest", //1
        "Tokenize an asset", //2
        "Find asset", //3
        "Licenses", //4
        "Sell shares", //5
        "Buy shares", //6
        "Fees" //7
    ]


    return (
        <>

            <StandardBG >
                <StandardInsideBG>
                    <div className="">
                        <div className="text-3xl font-bold mb-2">Getting Started</div>
                        {titles.map((title, index) => (
                            <div className=" " key={index}>
                                <ContentsButton title={title} onBtnClick={() => scrollToSection(index)} />
                            </div>
                        ))}
                    </div>

                </StandardInsideBG>


                <StandardInsideBG ref={_0_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[0]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">1. You need a crypto wallet (e.g. Metamask) installed in your browser.</div>
                        <div className="text-xl mb-2 leading-relaxed">
                            2. You need a minimal Ether balance on{" "}
                            <span className="inline-block align-middle">
                                <InfoRevealer
                                    explanation={"This will change to Optimism Mainnet when the project moves to phase 2.1."}
                                    width={100}
                                />
                            </span>
                            the Optimism Sepolia chain to pay for gas fees. There are crypto faucets where you can receive some Ether for free online.
                        </div>



                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_1_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[1]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">Create a manifest for your asset. Open a simple text editor and write a description of your asset. You can add additional information, such as how you perceive this asset, the goal of creating it, the rights of shareholders, or its future. Feel free to add any information you want.</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_2_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[2]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                You can tokenize your asset in the 'Create Asset' tab. All you need to do is:
                            </div>


                            <div className="flex">
                                <div>1.</div>
                                <div>You need to specify the title of your asset. This is only for descriptive purposes.</div>
                            </div>

                            <div className="flex">
                                <div>2.</div>
                                <div>
                                    Redistribute all {TOTAL_SUPLY} shares among all privileged shareholders
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"All initial shareholders, defined in the process of asset creation are called privileged shareholders. A privileged shareholder have aditional priviliges compared to a normal shareholer. More about the differences you can read in the Docs."}
                                            width={80}
                                        />
                                    </span>.
                                    There can be between 1 and 10 privileged shareholders. You need to specify a name
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"only descriptive meaning"}
                                        />
                                    </span>,
                                    a valid blockchain address and the number of shares.
                                </div>
                            </div>

                            <div className="flex">
                                <div>3.</div>
                                <div>
                                    You need to upload the asset's manifest and then hash it. This process involves multiple steps simultaneously. In essence it creates two things: a hash
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"Hashing in this example means creating a 32 bytes long number out of the base64 encoded text version of your manifest, displayed in the form of 64 long hex number using keccak256 algorithm."} width={70}
                                        />
                                    </span>{" "}
                                    and a new file
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"A base64 encoded version of your manifest. You can use free online tool to decode this file to ensure yourself that this encoded version is compatible with the original."} width={70}
                                        />
                                    </span>. The hash will be saved on the blockchain, while the encoded file must be securely stored by you.</div>
                            </div>

                            <div className="flex">
                                <div>4.</div>
                                <div>
                                    Press the 'Tokenize' button. Accept the transaction in your browser wallet
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"Make sure you have enough ether to pay for the gas fee."} width={70}
                                        />
                                    </span>. Wait for the blockchain response. If everything goes well, you should receive the contract address of your asset.
                                </div>
                            </div>

                            <div className="mt-4">
                                <div>After the entire process, you should have:</div>
                                <div>1. Original Manifest File</div>
                                <div>2. Encoded Manifest File
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"base64 encoded"}
                                        />
                                    </span></div>
                                <div>3. Assets's Blockchain Address
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"20 bytes long number displayed as 40 hex long number"}
                                            width={50}
                                        />
                                    </span></div>
                                <div>4. Assets's Hash
                                    <span className="inline-block align-middle">
                                        <InfoRevealer
                                            explanation={"32 bytes long number displayed as 64 hex long number"}
                                            width={50}
                                        />
                                    </span></div>

                                <div>Both the address and the hash can be used to connect to your asset's contract in the 'Find Asset' tab. Both the original and encoded manifest can be used to confirm the authenticity of your asste's contract. All these elements should be shared with interested users.</div>
                            </div>




                        </div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_3_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[3]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                You can connect to any asset's contract using its contract address or manifest hash. Both should be publicly available and shared by the asset creator or privileged shareholders.<span className="inline-block align-middle">
                                    <InfoRevealer
                                        explanation={"All initial shareholders, defined in the process of asset creation are called privileged shareholders. A privileged shareholder have aditional priviliges compared to a normal shareholer. More about the differences you can read in the Docs."}
                                        width={80} whichSide={2}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>



                </StandardInsideBG>

                <StandardInsideBG ref={_4_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[4]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                A license is an agreement between a privileged shareholer and any user. It is used to send Ether to the asset's contract. This Ether is called a dividend and is proportionally distributed among all shareholders<span className="inline-block align-middle">
                                    <InfoRevealer
                                        explanation={"both privileged and normal"}
                                    />
                                </span>.
                            </div>
                        </div>
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                A license must have its own manifest describing the purpose for which a user is sending Ether.
                            </div>
                        </div>


                    </div>



                </StandardInsideBG>


                <StandardInsideBG ref={_5_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[5]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                Any privileged shareholder can sell their shares by createing an offer. An offer must specify the number of shares available for sell and the price per share.
                                Any privileged shareholder can withdraw their offer at any moment.
                            </div>
                        </div>
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                All shares held by normal users are, by default, placed in a sell offer where a normal user can specify the price per share they are willing to sell for.
                            </div>
                        </div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_6_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[6]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                Any user can buy shares listed in the 'All Shares' section of the asstet's contract. To buy shares find an available offer. Press 'Buy Shares' button,  specify the number of shares to buy, and if you are not a privileged shareholder, specify the price you are willing to pay per share.
                            </div>
                            <div className="mb-2">
                                If the 'Buy Shares' button is not visible, it may be due to:
                            </div>
                            <div>1. The seller has a dividend to collect.</div>
                            <div>2. You have a dividend to collect.</div>
                            <div>3. The seller is a privileged shareholder and has fees to collect.</div>
                            <div>4. As a privileged shareholder, you have fees to collect.</div>
                            <div className="mt-2">
                                In all cases, you must collect these dividends or fees on behalf of the owner of those dividends or fees.
                            </div>


                        </div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_7_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[7]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                There are two types of fees:
                            </div>
                            <div>1. Paid to privileged shareholders - current fee = 2.00%.</div>
                            <div>2. Paid to the protocol - current fee = 0.00%.</div>
                        </div>

                        <div className="text-xl mb-2 text-justify">
                            <div className="mb-2">
                                When a privileged shareholder creates a sell offer, the specified price includes the protocol fee.
                            </div>
                            <div className="mb-2">
                                When a normal user buys a share in the asset, the specified price includes both the privileged shareholders' fee and the protocol fee.
                            </div>
                            <div className="mb-2">
                                Both types of fees are passed on to the owners only during the share purchase process.
                            </div>
                        </div>

                    </div>


                </StandardInsideBG>
            </StandardBG>


        </>

    );

};

export default GettingStarted;

