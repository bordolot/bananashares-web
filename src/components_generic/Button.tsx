import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export function ConnectButton() {
    return (
        <>
            <div className='mx-auto my-auto'>
                <button
                    className='w-full py-2 px-6 bg-[#00df9a] rounded-xl text-black hover:bg-[#9ab5df] duration-500'
                    onClick={() => { console.clear() }}>
                    Connect
                </button>
            </div>
        </>
    )
}


interface SpriteButtonProps {
    buttonName: string;
    handleClick: () => void;
}

export const SpriteButton: React.FC<SpriteButtonProps> = ({ buttonName, handleClick }) => {
    return (
        <div className="flex justify-center items-center">
            <button
                className="py-4 px-8 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
                onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    );
};

interface BackButtonProps {
    buttonName: string;
    handleClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ buttonName, handleClick }) => {
    return (
        <div className="flex justify-center items-center">
            <button
                className="py-2 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
                onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    );
};


interface ButtonStandardProps {
    buttonName: string;
    handleClick: () => void;
}

export const ButtonStandard: React.FC<ButtonStandardProps> = ({ buttonName, handleClick }) => {
    return (
        <div className="flex">
            <button
                className="btnInteract"
                onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    );
};


export const ButtonStandardToWallet: React.FC<ButtonStandardProps> = ({ buttonName, handleClick }) => {
    return (
        <div className="flex">
            <button
                className="btnSendtransaction px-3"
                onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    );
};

export const ButtonStandardArrowRight: React.FC<ButtonStandardProps> = ({ buttonName, handleClick }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    return (
        <div className="flex justify-center items-center">
            <button
                className="btnInteract flex items-center"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
                onMouseLeave={() => setIsHovered(false)} // Reset isHovered on mouse leave
            >
                {buttonName}
                <FaChevronRight
                    className={`text-yellow-400 text-sm transition-transform duration-300 ${isHovered ? "animate-move-right" : ""}`}
                />
            </button>
        </div>
    );
};

export const ButtonStandardArrowLeft: React.FC<ButtonStandardProps> = ({ buttonName, handleClick }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    return (
        <div className="flex justify-center items-center">
            <button
                className="btnInteract flex items-center"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
                onMouseLeave={() => setIsHovered(false)} // Reset isHovered on mouse leave
            >
                {buttonName}
                <FaChevronLeft
                    className={`text-yellow-400 text-sm transition-transform duration-300 ${isHovered ? "animate-move-left" : ""}`}
                />
            </button>
        </div>
    );
};


interface ContentsButtonProps {
    title: string;
    onBtnClick: () => void;
}

export const ContentsButton: React.FC<ContentsButtonProps> = ({ title, onBtnClick }) => {
    return (
        <div>
            <button className="btnContents" onClick={onBtnClick}>
                {title}
            </button>
        </div>

    );
}