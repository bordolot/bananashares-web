import React from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { getCurrentPhase } from "./About";

interface GovernanceProps { }

const Governance: React.FC<GovernanceProps> = () => (
    <StandardBG >

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