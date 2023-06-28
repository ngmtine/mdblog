"use client";

import React, { useState } from "react";
import HamburgerButton from "@/util/hamburgerButton";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    // children: PostList
    return (
        <div className="w-64 p-4 h-screen bg-gray-900 overflow-y-scroll overflow-x-hidden pt-20">
            {children}
            <div className="fixed bottom-0">
                <HamburgerButton callback={toggleOpen}></HamburgerButton>
            </div>
        </div>
    );
};

export default Sidebar;
