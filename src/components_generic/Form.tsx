import { FormEvent, ReactNode } from "react";


interface FormProps {
    children: ReactNode;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitName: string;
}

const Form = ({ children, handleSubmit, submitName }: FormProps) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {children}
                    <div className="form-group my-5">
                        <input
                            className="btnSendtransaction"
                            type="submit"
                            value={submitName}
                        />
                    </div>
                </div>
            </form>

        </div>
    );
};

export default Form;