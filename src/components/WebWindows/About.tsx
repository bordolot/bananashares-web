import React from "react";

interface AboutProps { }

const About: React.FC<AboutProps> = () => (
    <div className="p-6 bg-gradient-to-r from-green-200 to-teal-300 rounded-lg shadow-md ">
        About section
    </div>
);

export default About;