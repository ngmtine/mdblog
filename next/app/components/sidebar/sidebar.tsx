"use client";

import { useState } from "react";
import { ArticleList } from "./articleList";
import { SidebarContents } from "./sidebarContents";
import { ToggleSidebarButton } from "./toggleSidebarButton";

export const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            <ToggleSidebarButton handleClick={toggleSidebar} />
            <SidebarContents //
                isSidebarOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            >
                <ArticleList />
            </SidebarContents>
        </>
    );
};
