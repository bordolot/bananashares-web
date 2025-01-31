import { ChangeEvent, useState } from "react";
import InfoRevealer from "../../components_generic/InfoRevealer";
import { TitleValueInOneLine, ValueUnit } from "../../components_generic/SimpleCompenents";
import { MIN_SELL_OFFER, WEI_IN_ETHER } from "../../utility/Globals";


interface BuySharesFormProps {
    numberOfShares: number;
    pricePerShare: number;
    isUserPrivileged: boolean;
}

export function ModalBuySharesForm({ numberOfShares, pricePerShare, isUserPrivileged }: BuySharesFormProps) {

    const [sharesAvailable, setSharesAvailable] = useState(numberOfShares);
    const [finalPrice, setFinalPrice] = useState(0);

    const handlePriceChange = () => (event: ChangeEvent<HTMLInputElement>) => {
        let _value = parseFloat(event.target.value);
        if (isNaN(_value)) _value = 0;
        setFinalPrice(_value * pricePerShare);
        setSharesAvailable(numberOfShares - _value);
    };


    return (
        <div className="min-w-110">
            <TitleValueInOneLine
                title={"Shares available for purchase:"}
                distanse={"mr-3"}
                value={sharesAvailable} />
            <div className="mb-2"></div>
            <TitleValueInOneLine
                title={"Price per share:"}
                distanse={"mr-3"}
                value={
                    <div className="flex">
                        <InfoRevealer explanation={<ValueUnit value={pricePerShare} unit={"WEI"} />} />
                        <div className="mr-2"></div>
                        {(pricePerShare / WEI_IN_ETHER).toFixed(5)} ETH
                    </div>
                } />
            <div className="mb-2"></div>

            <div className="textStandard">Specify number of shares to buy:</div>
            <input
                className="w-60 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="0"
                max={numberOfShares}
                name="number_of_shares"
                placeholder="number of shares"
                onChange={handlePriceChange()}
                required />

            <div className="mb-2"></div>

            <TitleValueInOneLine
                title={"Final price to pay:"}
                distanse={"mr-3"}
                value={
                    <div className="flex">
                        <InfoRevealer explanation={<ValueUnit value={finalPrice} unit={"WEI"} />} />
                        <div className="mr-2"></div>
                        {(finalPrice / WEI_IN_ETHER).toFixed(5)} ETH
                    </div>
                } />
            <div className="mb-2"></div>


            {!isUserPrivileged &&
                <>
                    <div className="flex">
                        <InfoRevealer explanation={<>Before purchasing any shares, you need to specify the price at which you are willing to sell them.</>} width={1} />
                        <div className="mr-2"></div>
                        <div>Specify your price per share [Ether]:</div>
                    </div>

                    <input
                        className="w-60 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        min="0"
                        step={MIN_SELL_OFFER / WEI_IN_ETHER}
                        defaultValue={MIN_SELL_OFFER / WEI_IN_ETHER}
                        name="price_per_share"
                        placeholder="your price per share"
                        required />
                </>
            }


        </div>
    )
}