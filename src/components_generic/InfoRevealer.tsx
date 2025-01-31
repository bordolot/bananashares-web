import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';


interface InfoRevealerProps {
    // explanation: string; // Explanation text to display in the tooltip
    explanation: React.ReactNode; // Accepts any React component
    width?: number;
}

const InfoRevealer: React.FC<InfoRevealerProps> = ({ explanation, width }) => {
    const [isVisible, setIsVisible] = useState(false);


    // const formattedExplanation = explanation.split('\n').map((line, index) => (
    //     <React.Fragment key={index}>
    //         {line}
    //         <br />
    //     </React.Fragment>
    // ));

    let formated;
    if (width) {
        console.log()
        switch (width) {
            case 150:
                formated = <div className='w-150'>{explanation}</div>;
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


                    <div className="absolute top-1/2 left-full ml-0 -translate-y-1/2 p-4 text-base text-left text-yellow-400 bg-gray-800 rounded shadow-lg w-auto z-10">
                        <div className='text-justify'>{width ? formated : explanation}</div>

                    </div>





                )}
            </div>
        </div>
    );
};

export default InfoRevealer;
