"use client";

import { useAtom } from "jotai";

import { sidebarState } from "./sidebarAtom";
import { SvgHamburger } from "./svg/SvgHamburger";

export const ToggleSidebarButton = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarState);

    const toggleSidebar = () => {
        console.log("toggle!!");
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <button
            id="ToggleSidebarButton"
            className="fixed bottom-0 z-50 mb-3 ml-3 inline-block translate-y-0 transition-transform duration-300 ease-in-out lg:translate-y-11"
            onClick={toggleSidebar}
        >
            <SvgHamburger />
        </button>
    );
};
