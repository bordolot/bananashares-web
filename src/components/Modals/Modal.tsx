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
            className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={handleClick}
        >
            <div
                className="bg-white rounded-lg p-5 max-w-3xl"
                onClick={handleClick}
            >
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                    onClick={onClose}
                >
                    Hide Modal
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalContent;