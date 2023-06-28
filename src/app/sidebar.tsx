"use client";

import React, { useState } from "react";
import Link from "next/link";
import HamburgerButton from "@/util/hamburgerButton";

const blogTitle = "真・フランス料理紹介ブログ";

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    return (
        <div className="w-80 p-5 h-screen bg-gray-900 text-gray-300 relative">
            <div className="pb-5">
                <Link href={"/"} className="text-xl font-semibold mb-5">
                    {blogTitle}
                </Link>
            </div>
            {children}
            <div className="fixed bottom-0">
                <HamburgerButton callback={toggleOpen}></HamburgerButton>
            </div>
        </div>
    );
};

export default Sidebar;
