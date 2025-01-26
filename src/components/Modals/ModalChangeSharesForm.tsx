interface ChangeSharesFormProps {
}

export function ModalChangeSharesForm({ }: ChangeSharesFormProps) {
    return (<>
        <h4 className="my-1 text-3xl">Change sell offer:</h4>
        <div>Specify new price per share [ether]:</div>
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