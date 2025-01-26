interface ModalSellSharesProps {
    numberOfShares: number;
}

export function ModalSellShares({ numberOfShares }: ModalSellSharesProps) {
    return (<>
        <h4 className="my-1 text-3xl">Make sell offer:</h4>
        <div>Your shares to sell: {numberOfShares}</div>
        <div>Specify number of shares to sell:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0"
            name="number_of_shares"
            placeholder="number of shares"
            required />
        <div>Specify price per share [ether]:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0"
            step="0.0001"

            name="price_per_share"
            placeholder="price per share"
            required />
    </>)
}