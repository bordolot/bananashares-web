import * as React from "react";
import SvgComponent from "./BananaLogo_base";

const BananaLogo: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80px" /* Fixed width */
        height="80px" /* Fixed height */
        // style={{
        //     display: 'block', /* Prevent unexpected resizing inside flex containers */
        // }}

        viewBox="0 0 1080 1080"
    // width="15%"
    // height="15%"
    // style={{ maxWidth: '100%', maxHeight: '100%' }}
    >
        <SvgComponent />
    </svg>
);



export default BananaLogo;