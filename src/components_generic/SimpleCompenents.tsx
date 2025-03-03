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
                    <div className="textStandardInAbout p-10 my-10 mx-10 rounded-lg shadow-2xl bg-gradient-to-t from-yellow-300 to-lime-300">
                        {children}
                    </div>
                }
                {!isMobile &&
                    <div className="textStandardInAbout p-10 my-10 mx-30 rounded-lg shadow-2xl bg-gradient-to-t from-yellow-300 to-lime-300">
                        {children}
                    </div>
                }
            </div>
        );
    }
);


interface CodeBlockProps {
    code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
    return (
        <div className="bg-gray-100 px-5 rounded-lg shadow-md overflow-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">
                <code>{code}</code>
            </pre>
        </div>
    );
};



interface Table3ColumnsProps {
    dataTitles: string[];
    data: Array<{ column1: string, column2: string, column3: string }>;
}

export const Table3Columns: React.FC<Table3ColumnsProps> = ({ data, dataTitles }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[0]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[1]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[2]}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column2}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-wrap">{row.column3}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface Table4ColumnsProps {
    dataTitles: string[];
    data: Array<{ column1: string, column2: string, column3: string, column4: string }>;
}

export const Table4Columns: React.FC<Table4ColumnsProps> = ({ data, dataTitles }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[0]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[1]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[2]}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dataTitles[3]}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column2}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column3}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.column4}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};