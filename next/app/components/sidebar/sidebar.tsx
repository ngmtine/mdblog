"use client";
import { useResponsiveSidebar } from "./useResponsiveSidebar";

import type { ReactNode } from "react";
import { Title } from "~/app/components/title";
import { ToggleDarkmodeButton } from "./toggleDarkmodeButton";
import { ToggleSidebarButton } from "./toggleSidebarButton";
import { TwitterLink } from "./twitterLink";

interface Props {
    children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
    const { isSidebarOpen, toggleSidebar, sidebarRef } = useResponsiveSidebar();

    return (
        <div ref={sidebarRef} id="sidebar">
            <div
                className={`fixed left-0 top-0 h-full w-80 p-4 border-r border-gray-900 dark:border-gray-300 z-10 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-iceberg-light dark:bg-iceberg-dark lg:bg-transparent lg:dark:bg-transparent`}
            >
                <Title />

                {/* 記事リスト */}
                {children}

                {/* ボタンとか */}
                <div id="sidebarButtonArea" className="fixed bottom-0 mb-[0.2rem] ml-10 lg:ml-0">
                    <div className="inline-block">
                        <ToggleDarkmodeButton />
                    </div>
                    <div className="ml-2 inline-block">
                        <TwitterLink />
                    </div>
                </div>
            </div>
            <ToggleSidebarButton handleClick={toggleSidebar} />
        </div>
    );
};
