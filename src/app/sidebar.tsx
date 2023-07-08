"use client";

import React, { useState } from "react";
// import HamburgerButton from "@/util/hamburgerButton";
import ColorSchemeToggleButton from "@/util/colorSchemeToggleButton";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    // children: PostList
    return (
        <div id="leftSideBar" className="w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 hidden md:block">
            {children}
            <div className="fixed bottom-0">
                {/* <HamburgerButton callback={toggleOpen}></HamburgerButton> */}
                <div className="flex items-center justify-center mt-3">
                    <ColorSchemeToggleButton></ColorSchemeToggleButton>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
