import { ChangeEvent, useState } from "react";
import { TitleValueInOneLine } from "../../components_generic/SimpleCompenents";
import { TOTAL_SUPLY } from "../../utility/Globals";

interface ModalSellSharesProps {
    numberOfShares: number;
}

export function ModalSellShares({ numberOfShares }: ModalSellSharesProps) {
    const [pricePerShare, setPricePerShare] = useState(0);
    const [numberOfSharesLeftToSell, setNumberOfSharesLeftToSell] = useState(numberOfShares);
    const [numberOfSharesToSell, setNumberOfSharesToSell] = useState(0);
    const [percentLeft, setPercentLeft] = useState((numberOfShares / TOTAL_SUPLY * 100).toFixed(2));
    const [valueOfFinalOffer, setValueOfFinalOffer] = useState(0);

    const handleSharesChange = () => (event: ChangeEvent<HTMLInputElement>) => {
        let _value = parseFloat(event.target.value);
        if (isNaN(_value)) _value = 0;
        const _newValue = numberOfShares - _value;
        setNumberOfSharesLeftToSell(_newValue);
        setNumberOfSharesToSell(_value);
        setPercentLeft((_newValue / TOTAL_SUPLY * 100).toFixed(2));
        changeFinalPrice(pricePerShare, _value);

    };

    const handlePriceChange = () => (event: ChangeEvent<HTMLInputElement>) => {
        let _value = parseFloat(event.target.value);
        if (isNaN(_value)) _value = 0;
        setPricePerShare(_value);
        changeFinalPrice(_value, numberOfSharesToSell);
    };

    const changeFinalPrice = (_pricePerShare: number, numberOfShares: number) => {
        setValueOfFinalOffer(_pricePerShare * numberOfShares);
    }


    return (
        <div className="min-w-110">
            {/* <h4 className="my-1 text-3xl">Make sell offer:</h4> */}

            <TitleValueInOneLine
                title={"Your shares left:"}
                distanse={"mr-3"}
                value={numberOfSharesLeftToSell} />
            <div className="mb-2"></div>
            <TitleValueInOneLine
                title={"Shares left:"}
                distanse={"mr-3"}
                value={<>{percentLeft}%</>} />
            <div className="mb-5"></div>


            <div className="textStandard">Specify number of shares to sell:</div>
            <input
                className="min-w-55 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="0"
                max={numberOfShares}
                name="number_of_shares"
                placeholder="number of shares"
                onChange={handleSharesChange()}
                required />
            <div>Specify price per share [Ether]:</div>
            <input
                className="min-w-55 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="0"
                step="0.0001"
                onChange={handlePriceChange()}
                name="price_per_share"
                placeholder="price per share"
                required />
            <div className="mb-5"></div>
            <TitleValueInOneLine
                title={"Total offer value:"}
                distanse={"mr-3"}
                value={<>{valueOfFinalOffer.toFixed(4)} Ether</>} />
            <div className="mb-5"></div>


            <div className="mb-10"></div>
        </div>



    )
}