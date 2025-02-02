import { forwardRef, ReactNode } from "react";
import { useEffect, useState } from "react";

interface TitleValueInOneLineProps {
    title: React.ReactNode;
    distanse: string;
    value: React.ReactNode;
}

export const TitleValueInOneLine: React.FC<TitleValueInOneLineProps> = ({ title, distanse, value }) => {

    return (
        <div className="flex">
            <div className="textStandardBold">{title}</div>
            <div className={distanse}></div>
            <div className="textStandard ">{value}</div>
        </div>
    );
};


interface ValueUnitProps {
    value: React.ReactNode;
    unit: React.ReactNode;
}

export const ValueUnit: React.FC<ValueUnitProps> = ({ value, unit }) => {

    return (
        <div className="flex">
            <div >{value}</div>
            <div className="mr-1"></div>
            <div >{unit}</div>
        </div>
    );
};

interface StandardBGProps {
    children: ReactNode;
}


export const StandardBG: React.FC<StandardBGProps> = ({ children }) => {
    return (
        <div className="flex flex-col bg-gradient-to-t from-green-600 to-yellow-400">
            {children}
        </div>
    )
}

interface StandardInsideBGProps {
    children: ReactNode;
    ref?: React.RefObject<HTMLDivElement>;
}

export const StandardInsideBG = forwardRef<HTMLDivElement, StandardInsideBGProps>(

    ({ children }, ref) => {

        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
            setIsMobile(mobileMediaQuery.matches);
            const handleMediaChange = (event: MediaQueryListEvent) => {
                setIsMobile(event.matches);
            };
            mobileMediaQuery.addEventListener("change", handleMediaChange);

            return () => {
                mobileMediaQuery.removeEventListener("change", handleMediaChange);
            };
        }, []);


        return (
            <div ref={ref}>
                {isMobile &&
                    <div className="textStandardInAbout p-10 my-10 mx-10 rounded-lg shadow-2xl bg-gradient-to-t from-green-500 to-yellow-400">
                        {children}
                    </div>
                }
                {!isMobile &&
                    <div className="textStandardInAbout p-10 my-10 mx-30 rounded-lg shadow-2xl bg-gradient-to-t from-green-500 to-yellow-400">
                        {children}
                    </div>
                }
            </div>
        );
    }
);


