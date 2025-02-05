import React from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import EmailForm from "../../components_generic/EmailForm";

interface HelpProps { }

const Help: React.FC<HelpProps> = () => (
    <StandardBG >

        <StandardInsideBG>
            <div className="text-2xl">
                Join our Discord server to stay up-to-date with the latest news, updates, and discussions about our protocol.
            </div>
            {/* <EmailForm /> */}
        </StandardInsideBG>
    </StandardBG >
);

export default Help;