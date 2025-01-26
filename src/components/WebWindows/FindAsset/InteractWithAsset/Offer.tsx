import React from "react";
// import { ButtonStandard } from "../../../../components_generic/Button";
import { WEI_IN_ETHER, TOTAL_SUPLY, BIPS } from "../../../../utility/Globals";

interface OfferProps {
    from: string | undefined;
    amount: number;
    sharePrice: number;
}

export const Offer: React.FC<OfferProps> = ({ from, amount, sharePrice }) => {
    return (
        <>
            {from && <div>From: {from}</div>}
            {amount && <div>Amount: {BIPS * amount / TOTAL_SUPLY}% ={'>'} {amount} shares, </div>}
            {sharePrice &&
                <div>
                    <div>Price per share: {sharePrice / WEI_IN_ETHER} [ether]</div>
                    <div>Price for total amount: {sharePrice / WEI_IN_ETHER * amount} [ether]</div>
                </div>}
        </>
    );
}