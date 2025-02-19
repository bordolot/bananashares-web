import React from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { getCurrentPhase } from "./About";

interface GovernanceProps { }

const Governance: React.FC<GovernanceProps> = () => (
    <StandardBG >
        <div className=" mt-5 flex justify-center">
            <AutoPlayVideo />

        </div>

        <StandardInsideBG>
            <div className="text-2xl">
                Bananashares token is the official ERC-20 governance token of the Bananashares Protocol, empowering the community to participate in key decisions. It is deployed on the Optimism mainnet at [0x...]. Holders can vote on proposals and shape the future of the protocol.
            </div>
        </StandardInsideBG>


        <StandardInsideBG>
            <div className="text-2xl">
                The protocol is currently in phase {getCurrentPhase()}. This means Bananashares tokens are officially launched but not yet available for purchase.
            </div>
        </StandardInsideBG>

    </StandardBG >
);

export default Governance;


const AutoPlayVideo: React.FC = () => {
    return (
        <div style={{ width: "200px", overflow: "hidden", borderRadius: "20px" }}>
            <video
                width="500"
                autoPlay
                loop
                muted
                playsInline // Important for mobile devices
                style={{ borderRadius: "20px" }}
            >
                <source src="../../../public/coin.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

    );
};