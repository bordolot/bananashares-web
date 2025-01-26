import React from "react";
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import BananaLogo from "../../assets/BananaLogo";
import { dropdownItems, dropdownItemsMobile } from "./NavbarItems";

interface TitleButtonProps {
    onNavbarClick: (item: string) => void;
    whichSize: "mobile" | "desktop"; // New prop to determine dropdown items
}

export const TitleButton: React.FC<TitleButtonProps> = ({ onNavbarClick, whichSize }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen((prev) => !prev); // Toggle dropdown on click
    };

    const handleOptionClick = (option: string) => {
        // Close the dropdown
        onNavbarClick(option);
        setIsDropdownOpen(false);
    };

    // Choose dropdown items based on screen size (mobile or desktop)
    const itemsToRender = whichSize === "mobile" ? dropdownItemsMobile : dropdownItems;

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDropdownToggle}
        >
            <button className="flex items-center gap-3 py-0 px-6 text-yellow-400 rounded-full transition duration-300 shadow-lg">
                <BananaLogo />

                {/* Text in the middle */}
                <div className="text-left font-bold">
                    <div>Banana</div>
                    <div>Shares</div>
                </div>

                {/* Arrow on the right */}
                <FaChevronDown
                    className={`text-yellow-400 text-sm transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
                <div
                    className="absolute top-full mt-2 w-48 bg-white border bg-opacity-100 border-gray-200 rounded-lg shadow-lg"
                    style={{ marginTop: "-1px" }} // Add spacing for buffer
                >
                    <ul className="text-sm text-gray-700">
                        {itemsToRender.map((item) => (
                            <li
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-100 bg-opacity-100 hover:rounded-lg cursor-pointer"
                                onClick={() => handleOptionClick(item.text)}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
