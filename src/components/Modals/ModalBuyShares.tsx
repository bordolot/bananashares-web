import { WEI_IN_ETHER } from "../../utility/Globals";

interface BuySharesFormProps {
    numberOfShares: number;
    pricePerShare: number;
}

export function ModalBuySharesForm({ numberOfShares, pricePerShare }: BuySharesFormProps) {
    return (<>
        <h4 className="my-1 text-3xl">Make sell offer:</h4>
        <div>Shares to buy: {numberOfShares}</div>
        <div>Price per share: {pricePerShare / WEI_IN_ETHER} [ether]</div>
        <div>Specify number of shares to buy:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0"
            name="number_of_shares"
            placeholder="number of shares"
            required />
        <div>Specify your price per share [ether]:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0"
            step="0.001"
            name="price_per_share"
            placeholder="your price per share"
            required />

    </>)
}