import { MIN_SELL_OFFER, WEI_IN_ETHER } from "../../utility/Globals";

interface ChangeSharesFormProps {
}

export function ModalChangeSharesForm({ }: ChangeSharesFormProps) {
    return (<>
        {/* <h4 className="my-1 text-3xl">Change sell offer:</h4> */}
        <div className="textStandard"> Specify new price per share [Ether]:</div>
        <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            min="0"
            step={MIN_SELL_OFFER / WEI_IN_ETHER}
            defaultValue={MIN_SELL_OFFER / WEI_IN_ETHER}
            name="price_per_share"
            placeholder="price per share"
            required />
    </>)
}