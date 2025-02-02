import React, { useRef } from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { ContentsButton } from "../../components_generic/Button";

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
            const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight + 150;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const titles = [
        "Prerequisites",
        "An asset manifest",
        "Tokenize an asset",
        "Find asset",
        "Licenses",
        "Sell shares",
        "Buy shares",
        "Fees"
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
                        <div className="text-xl mb-2">1. You need a crypto wallet e.g. Metamask or Coinbase installed on your browser.</div>
                        <div className="text-xl mb-2">2. You need a minimal ether balance on Optimism chain to pay for gas fees.</div>

                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_1_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[1]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_2_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[2]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_3_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[3]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_4_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[4]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>


                <StandardInsideBG ref={_5_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[5]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_6_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[6]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>

                <StandardInsideBG ref={_7_ref}>
                    <div className="">
                        <div className="text-3xl mb-8">{titles[7]}</div>
                    </div>

                    <div className="">
                        <div className="text-xl mb-2">....</div>
                    </div>
                </StandardInsideBG>






            </StandardBG>


        </>

    );

};

export default GettingStarted;

