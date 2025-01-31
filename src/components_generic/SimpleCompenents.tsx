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




