import React, { useEffect } from "react";
import { useWallet } from "../../blockchain/WalletInterface";


interface DocsProps { }

const Docs: React.FC<DocsProps> = () => {
    const { reloadKey } = useWallet();
    useEffect(() => { console.log("Docs start: ", reloadKey) }, [reloadKey])

    return (
        <div className="p-6 bg-gradient-to-r from-green-200 to-teal-300 rounded-lg shadow-md">
            Docs
        </div>
    );
}


export default Docs;