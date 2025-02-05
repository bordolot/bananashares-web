import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface InfoRevealerProps {
    // explanation: string; // Explanation text to display in the tooltip
    explanation: React.ReactNode; // Accepts any React component
    width?: number;
    whichSide?: 1 | 2;
}

const InfoRevealer: React.FC<InfoRevealerProps> = ({ explanation, width, whichSide = 1 }) => {
    const [side, setSide] = useState(whichSide);
    const [isVisible, setIsVisible] = useState(false);

    const invertSide = () => {
        if (side == 1) {
            setSide(2);
        } else {
            setSide(1);
        }
        setIsVisible(false);
    }

    let formated;
    if (width) {
        switch (width) {
            case 150:
                formated = <div className='w-150'>{explanation}</div>;
                break;
            case 90:
                formated = <div className='w-90'>{explanation}</div>;
                break;
            case 80:
                formated = <div className='w-80'>{explanation}</div>;
                break;
            case 70:
                formated = <div className='w-70'>{explanation}</div>;
                break;
            case 50:
                formated = <div className='w-50'>{explanation}</div>;
                break;
            default:
                formated = <div className='w-100'>{explanation}</div>;
        }
    }

    return (
        <div className="relative flex items-center">
            <div
                className="cursor-pointer text-blue-500 font-semibold"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <FiInfo size={20} />
                {/* @TODO adjust width to smartphones */}
                {isVisible && (
                    // <div className="absolute top-1/2 left-full ml-0 transform -translate-y-1/2 p-4 text-base text-justify text-yellow-400 bg-gray-800 rounded shadow-lg w-auto z-10" >
                    <div className={`absolute top-1/2  ${(side == 1) ? `left-full ml-0 pr-4` : `right-full mr-0 pl-4`} -translate-y-1/2 py-4  text-base text-left text-yellow-400 bg-gray-800 rounded shadow-lg w-auto z-10`}>


                        <div className='text-justify'>
                            <div className='flex '>
                                {(side == 1) ?
                                    <button
                                        className="flex items-center hover:bg-white/30 rounded-r-2xl"
                                        onClick={invertSide}>
                                        <FaChevronLeft
                                            className={`text-yellow-400`}
                                        />
                                    </button>
                                    :
                                    <></>}
                                <div>{width ? formated : explanation}</div>
                                {(side == 2) ?
                                    <button
                                        className="flex items-center hover:bg-white/30 rounded-l-2xl"
                                        onClick={invertSide}>
                                        <FaChevronRight
                                            className={`text-yellow-400`}
                                        />
                                    </button>
                                    :
                                    <></>}

                            </div>
                        </div>

                    </div>





                )}
            </div>
        </div>
    );
};

export default InfoRevealer;
