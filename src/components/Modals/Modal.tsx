import { ReactNode, MouseEvent } from "react";

interface ModalContentProps {
    children: ReactNode;
    onClose: () => void;
}

const ModalContent = ({ children, onClose }: ModalContentProps) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div
            className="fixed z-10 inset-0 bg-black/50 flex justify-center items-center"
            onClick={handleClick}
        >
            <div
                className="bg-white rounded-lg p-5 max-w-3xl mt-24 max-h-[75vh] h-auto overflow-y-auto"
                onClick={handleClick}
            >
                <button
                    className="btnInteractRed"
                    onClick={onClose}
                >
                    Hide
                </button>
                <div className="pb-5"></div>
                {children}
            </div>
        </div>
    );
};

export default ModalContent;