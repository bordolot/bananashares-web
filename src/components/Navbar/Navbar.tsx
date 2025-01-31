import React, { forwardRef, useEffect, useState } from "react";
import { ConnectButton } from "./BtnConnect";
import { TitleButton } from "./BtnTitle";
import { navItems } from "./NavbarItems";


interface NavbarProps {
    onNavbarClick: (item: string) => void;
    navbarRef: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = forwardRef(({ onNavbarClick, navbarRef }, _ref) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Create a media query for mobile screens
        const mobileMediaQuery = window.matchMedia("(max-width: 768px)");

        // Set initial state based on the media query
        setIsMobile(mobileMediaQuery.matches);

        // Set up a listener for changes to the media query
        const handleMediaChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add listener to the media query
        mobileMediaQuery.addEventListener("change", handleMediaChange);

        // Cleanup the listener when component is unmounted or on re-renders
        return () => {
            mobileMediaQuery.removeEventListener("change", handleMediaChange);
        };
    }, []);


    return (
        <div ref={navbarRef} className="fixed top-0 w-full bg-black/95 flex justify-between items-center h-24 text-white px-4 z-50">
            {/* Title Button and Navigation */}
            <div className="flex items-center space-x-1">
                {/* Title Button */}
                <TitleButton whichSize={isMobile ? "mobile" : "desktop"} onNavbarClick={onNavbarClick} />

                {/* Navigation */}
                {!isMobile && (
                    <ul className="flex space-x-1">
                        {navItems.map((item) => (
                            <li
                                key={item.id}
                                className="hover:bg-[#00df9a] whitespace-nowrap px-4 py-2 rounded-lg cursor-pointer
                                    duration-300 text-yellow-400 hover:text-black"
                                onClick={() => onNavbarClick(item.text)}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Connect Button */}
            <div className="ml-auto">
                <ConnectButton />
            </div>
        </div>
    );
});

export default Navbar;