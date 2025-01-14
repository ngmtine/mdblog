"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { SidebarContents } from "./sidebarContents";
import { ToggleSidebarButton } from "./toggleSidebarButton";

interface Props {
    children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div id="sidebar">
            <ToggleSidebarButton handleClick={toggleSidebar} />
            <SidebarContents //
                isSidebarOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            >
                {children}
            </SidebarContents>
        </div>
    );
};
