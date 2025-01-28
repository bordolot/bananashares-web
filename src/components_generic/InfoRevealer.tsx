import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

// interface InfoRevealerProps {
//     text?: string;        // Text fragment that needs the info
//     explanation: string; // Explanation for the info
// }

// const InfoRevealer: React.FC<InfoRevealerProps> = ({ text, explanation }) => {
//     const [isVisible, setIsVisible] = useState(false);

//     const formattedExplanation = explanation.split('\n').map((line, index) => (
//         <React.Fragment key={index}>
//             {line}
//             <br />
//         </React.Fragment>
//     ));


//     return (
//         <div className="flex items-center space-x-2 relative">
//             {text && <span className="textStandard">{text}</span>}
//             <div
//                 className="cursor-pointer text-blue-500 font-semibold mx-2"
//                 onMouseEnter={() => setIsVisible(true)}
//                 onMouseLeave={() => setIsVisible(false)}
//             >
//                 ⓘ
//                 {isVisible && (
//                     <div
//                         className="absolute top-0 right-0 left-1/2 transform -translate-x-1/2 mb-2 p-6 text-s text-yellow-400 bg-gray-800 rounded shadow-lg
//                           min-w-[200px] w-auto"


//                     >
//                         {formattedExplanation}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default InfoRevealer;



interface InfoRevealerProps {
    explanation: string; // Explanation text to display in the tooltip
}

const InfoRevealer: React.FC<InfoRevealerProps> = ({ explanation }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Format explanation to handle line breaks
    const formattedExplanation = explanation.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

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
                    <div
                        className="absolute top-1/2 left-full ml-2 transform -translate-y-1/2 p-4 text-base text-justify text-yellow-400 bg-gray-800 rounded shadow-lg min-w-[400px] max-w-[600px] w-auto z-10"
                    >
                        {formattedExplanation}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoRevealer;