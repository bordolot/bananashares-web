import React from "react";
import { StandardBG, StandardInsideBG } from "../../components_generic/SimpleCompenents";
import { ButtonStandardArrowRight } from "../../components_generic/Button";
import { dropdownItems } from "../Navbar/NavbarItems";

interface AboutProps {
    onNavbarClick: (item: string) => void;
    navbarRef: React.RefObject<HTMLDivElement>;
}

const About: React.FC<AboutProps> = ({ onNavbarClick, navbarRef }) => (

    <StandardBG >
        <StandardInsideBG>
            <div className="">
                <div className="sm:text-5xl md:text-6xl lg:text-7xl mb-8">What is Bananashares?</div>
                <div className="text-2xl mb-4 ">Bananashares is a real life asset tokenization crypto protocol.</div>
                <div className="text-2xl mb-4">Bananashares splits your asset into shares.</div>
                <div className="text-2xl mb-4">Bananashares gives you ability to sell these shares.</div>
                <div className="text-2xl mb-4">Bananashares helps you make profits from your asset.</div>
                <div className="text-2xl">Bananashares is a DAO, which means anyone can become a co-owner of Bananashares.</div>
            </div>
        </StandardInsideBG>

        <StandardInsideBG>
            <div className="">
                <div className="text-7xl mb-8">What is an asset?</div>
                <div className="text-2xl mb-4">An asset is any unique material or non-material object or entity described by its features in a text file, with the file's hash stored on the blockchain.</div>
                <div className="text-4xl mb-4">... so what can it be?</div>
                <div className="text-2xl mb-4">It can be an apartment in a building that you want to rent to someone, where you want them to pay with Ether, and you want this payment to be split instantaneously among each co-owner.</div>
                <div className="text-2xl mb-4">It can be your fantasy book, written in your free time after work, and in exchange for shares of your future profits from its film adaptation, you want to receive initial financial support for publishing it.</div>
                <div className="text-2xl mb-4">It can be a video blog that you run with your friend, and you want to give your audience the ability to send you gifts or even be part of your show.</div>
                <div className="text-2xl flex justify-center">...</div>
            </div>
        </StandardInsideBG>

        <StandardInsideBG>
            <div className="" ref={navbarRef}>
                <div className="text-7xl mb-8">How can i start?</div>
                <ButtonStandardArrowRight buttonName={"Go to Getting started"} handleClick={() => onNavbarClick(dropdownItems[1].text)} />
            </div>
        </StandardInsideBG>


    </StandardBG>




);

export default About;





