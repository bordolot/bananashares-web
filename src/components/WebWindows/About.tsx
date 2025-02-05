import React, { useEffect, useState } from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { ButtonStandardArrowRight } from "../../components_generic/Button";
import { dropdownItems } from "../Navbar/NavbarItems";

enum MAIN_PHASE {
    INITIAL,
    GROWING,
    FINAL
}

const MAIN_PHASE_DSC = [
    <div className="text-2xl"><div className="text-3xl font-bold">Initial Phase</div><></>Development & Testing<br /> (Testnet Stage)</div>,
    <div className="text-2xl"><div className="text-3xl font-bold">Growing Phase</div>Deployment<br /> & Token Distribution<br /> (Mainnet Stage)</div>,
    <div className="text-2xl"><div className="text-3xl font-bold">Final Phase</div>Decentralization<br /> & Full DAO Control</div>
]


const PROTOCOL_PHASES = [
    ["1.1", "Backend Architecture on Testnet", MAIN_PHASE.INITIAL],
    ["1.2", "Frontend Development", MAIN_PHASE.INITIAL],
    ["1.3", "Gathering Community Feedback", MAIN_PHASE.INITIAL],
    ["1.4", "Implementing Changes", MAIN_PHASE.INITIAL],
    ["1.5", "Security Audits of Final Smart Contracts", MAIN_PHASE.INITIAL],
    ["2.1", "Final Smart Contracts Deployment on Mainnet", MAIN_PHASE.GROWING],
    ["2.2", "Governance Token Distribution to Initial Users", MAIN_PHASE.GROWING],
    ["2.3", "DAO First Voting Proposal", MAIN_PHASE.GROWING],
    ["3.1", "Community-Governed Treasury", MAIN_PHASE.FINAL],
    ["3.2", "Frontend Hosting & Maintenance Transition to Community", MAIN_PHASE.FINAL]
]

const CURRENT_PHASE = 2

export function getCurrentPhase(): string {
    return (typeof PROTOCOL_PHASES[CURRENT_PHASE][0] === "string" ? PROTOCOL_PHASES[CURRENT_PHASE][0] : "")
}


interface AboutProps {
    onNavbarClick: (item: string) => void;
    navbarRef: React.RefObject<HTMLDivElement>;
}

const About: React.FC<AboutProps> = ({ onNavbarClick, navbarRef }) => {
    return (
        <StandardBG >
            <StandardInsideBG>
                <div className="">
                    <div className="sm:text-7xl md:text-7xl lg:text-7xl mb-8">What is Bananashares?</div>
                    <div className="text-2xl mb-4 ">Bananashares is a real life asset tokenization crypto protocol.</div>
                    <div className="text-2xl mb-4">Bananashares splits your asset into shares.</div>
                    <div className="text-2xl mb-4">Bananashares gives you ability to sell these shares.</div>
                    <div className="text-2xl mb-4">Bananashares helps you make profits from your asset.</div>
                    <div className="text-2xl">Bananashares is a DAO, which means anyone can become a co-owner of Bananashares.</div>
                </div>
            </StandardInsideBG>

            <StandardInsideBG>
                <div className="">
                    <div className="text-7xl mb-8">What is an asset?</div>
                    <div className="text-2xl mb-4">An asset is any unique material or non-material object or entity described by its features in a text file, with the file's hash stored on the blockchain.</div>
                    <div className="text-4xl mb-4">... so what can it be?</div>
                    <div className="text-2xl mb-4">It can be an apartment in a building that you want to rent to someone, where you want them to pay with Ether, and you want this payment to be split instantaneously among each co-owner.</div>
                    <div className="text-2xl mb-4">It can be your fantasy book, written in your free time after work, and in exchange for shares of your future profits from its film adaptation, you want to receive initial financial support for publishing it.</div>
                    <div className="text-2xl mb-4">It can be a video blog that you run with your friend, and you want to give your audience the ability to send you gifts or even be part of your show.</div>
                    <div className="text-2xl flex justify-center">...</div>
                </div>
            </StandardInsideBG>

            <StandardInsideBG>
                <div className="text-5xl mb-8">Current Phase of the Protocol: {PROTOCOL_PHASES[CURRENT_PHASE][0]}</div>

                {/* <div className="">
                    <div className="">
                        <div className="">{MAIN_PHASE_DSC[MAIN_PHASE.INITIAL]}</div>
                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={0}
                            toPhase={5} />
                    </div>

                    <div className="">

                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={5}
                            toPhase={8} />
                        <div className="">{MAIN_PHASE_DSC[MAIN_PHASE.GROWING]}</div>
                    </div>

                    <div className="">
                        <div className="text-right">{MAIN_PHASE_DSC[MAIN_PHASE.FINAL]}</div>
                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={8}
                            toPhase={10} />
                    </div>
                </div> */}


                <div className="flex flex-wrap gap-10">
                    {/* Column 1 */}
                    <div className=" ">
                        <div className="mt-5">{MAIN_PHASE_DSC[MAIN_PHASE.INITIAL]}</div>
                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={0}
                            toPhase={5}
                        />
                    </div>

                    {/* Column 2 */}
                    <div className="mt-35">
                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={5}
                            toPhase={8}
                        />
                        <div className="">{MAIN_PHASE_DSC[MAIN_PHASE.GROWING]}</div>
                    </div>

                    {/* Column 3 */}
                    <div className=" mt-0 "> {/* Moves this element slightly lower */}
                        <div className="">{MAIN_PHASE_DSC[MAIN_PHASE.FINAL]}</div>
                        <PhasesPresentation
                            phases={PROTOCOL_PHASES}
                            currentPhase={CURRENT_PHASE}
                            fromPhase={8}
                            toPhase={10}
                        />
                    </div>
                </div>






                {/* <PhasesPresentation phases={PROTOCOL_PHASES} currentPhase={CURRENT_PHASE} /> */}

            </StandardInsideBG>

            {/* <StandardInsideBG>
            <div className="text-5xl mb-8">Current Phase of the Protocol: 1.2</div>
            <ColorChangeLines totalLines={10} colorChangePercentage={20} />




        </StandardInsideBG> */}



            <StandardInsideBG>
                <div className="" ref={navbarRef}>
                    <div className="text-5xl mb-8">How can i start?</div>
                    <ButtonStandardArrowRight buttonName={"Go to Getting started"} handleClick={() => onNavbarClick(dropdownItems[1].text)} />
                </div>
            </StandardInsideBG>


        </StandardBG >

    );


};

export default About;






interface PhasesPresentationProps {
    phases: (string | MAIN_PHASE)[][];
    fromPhase: number;
    toPhase: number;
    currentPhase: number; // Percentage from 0 to 100

}



const PhasesPresentation: React.FC<PhasesPresentationProps> = ({ phases, currentPhase, fromPhase, toPhase }) => {
    return (
        <div className="flex flex-wrap gap-3">
            {/* <div className="flex "> */}
            {phases
                .slice(fromPhase, toPhase)
                .map((phase, index) => {
                    const originalIndex = fromPhase + index;
                    const [isVisible, setIsVisible] = useState(false);
                    let lineColor;


                    if (originalIndex === 0) {
                        lineColor = 'bg-gradient-to-r from-yellow-600 to-yellow-400'
                    }
                    else if (originalIndex < currentPhase) {
                        lineColor = 'bg-yellow-400'
                    }
                    else if (originalIndex == currentPhase) {
                        lineColor = 'bg-gradient-to-r from-yellow-400 to-green-400'
                    }
                    else if (phases.length - 1 === originalIndex && phase[2] === MAIN_PHASE.FINAL) {
                        lineColor = 'bg-gradient-to-r from-green-400 to-green-700'
                    }
                    else {
                        lineColor = 'bg-green-400'
                    }
                    return (
                        <div key={originalIndex} className="">
                            <div
                                className={`relative flex items-center justify-center w-15 h-20 rounded-xl ${lineColor}`}
                                onMouseEnter={() => setIsVisible(true)}
                                onMouseLeave={() => setIsVisible(false)}
                            >
                                <div className="textStandardInAbout text-3xl select-none">{typeof phase[0] === "string" ? phase[0] : ""}</div>
                                {isVisible && (
                                    <div className={`absolute top-1/2 ${(originalIndex % 2 == 1) ? `left-full mr-0` : `left-full ml-0`}  -translate-y-1/2 p-4 text-base text-left text-yellow-400 bg-gray-800 rounded shadow-lg w-auto z-10`}>
                                        <div className="text-2xl select-none">
                                            {typeof phase[1] === "string" ? phase[1] : ""}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>



                    );

                })}



        </div>
    );
};








interface ColorChangeLinesProps {
    totalLines: number;
    colorChangePercentage: number; // Percentage from 0 to 100
}

export const ColorChangeLines: React.FC<ColorChangeLinesProps> = ({ totalLines, colorChangePercentage }) => {
    return (
        <div className="flex justify-between w-full">
            {Array.from({ length: totalLines }).map((_, index) => {
                // Calculate the position of the current line as a percentage
                const linePositionPercentage = (index / (totalLines - 1)) * 100;

                // Determine the color based on the line's position and the colorChangePercentage
                const lineColor = linePositionPercentage <= colorChangePercentage ? 'bg-yellow-300' : 'bg-green-700';

                return (
                    <div
                        key={index}
                        className={`w-15 h-20 rounded-xl ${lineColor}`}
                    />
                );
            })}
        </div>
    );
};




