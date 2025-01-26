import React from "react";


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
        <div className="flex justify-center items-center my-2">
            <button
                className="py-2 px-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
                onClick={handleClick}>
                {buttonName}
            </button>
        </div>
    );
};

// export const TitleButton: React.FC<ButtonStandardProps> = ({ handleClick }) => {
//     return (
//         <div>

//             <button
//                 className="py-2 px-6 bg-gradient-to-r from-green-400 to-green-600 text-yellow rounded-full hover:bg-green-700 transition duration-300 shadow-lg"
//                 onClick={handleClick}>
//                 <>LOL</>
//                 <div>Bana</div>
//                 <div>Shara</div>
//             </button>
//         </div>
//     );
// };




