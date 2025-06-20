"use client";

import type { ReactNode } from "react";
import { Border } from "~/components/border";
import { GithubLinkButton } from "~/components/functionalIcons/githubLinkButton";
import { ToggleDarkmodeButton } from "~/components/functionalIcons/toggleDarkmodeButton";
import { ToggleSidebarButton } from "~/components/functionalIcons/toggleSidebarButton";
import { TwitterLinkButton } from "~/components/functionalIcons/twitterLinkButton";
import { Title } from "~/components/title";
import { useResponsiveSidebar } from "./useResponsiveSidebar";

interface Props {
    articleList: ReactNode;
    genreList: ReactNode;
}

export const Sidebar = ({ articleList, genreList }: Props) => {
    const { isSidebarOpen, toggleSidebar, sidebarRef } = useResponsiveSidebar();

    return (
        <div ref={sidebarRef} id="sidebar">
            <div
                className={`
                    fixed left-0 top-0 h-full w-80 p-4 z-10
                    bg-iceberg-light dark:bg-iceberg-dark shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                    border-r transition
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <Title />

                {/* 記事リスト（最新5件）*/}
                <div className="text-sm text-right">latest</div>
                <Border />
                {articleList}

                {/* ジャンル一覧 */}
                <div className="text-sm text-right">genre</div>
                <Border />
                {genreList}

                {/* ボタンとか */}
                <div id="sidebarButtonArea" className="fixed bottom-0 mb-[0.2rem] ml-10 lg:ml-0">
                    <div className="ml-3 mb-1 inline-block">
                        <ToggleDarkmodeButton />
                    </div>
                    <div className="ml-4 inline-block translate-y-[2px]">
                        <GithubLinkButton />
                    </div>
                    <div className="ml-4 inline-block translate-y-[2px]">
                        <TwitterLinkButton />
                    </div>
                </div>
            </div>
            <div
                className="
                    fixed inline-block
                    bottom-0 ml-3 z-50
                    transition translate-y-0 lg:translate-y-11
                "
            >
                <ToggleSidebarButton handleClick={toggleSidebar} />
            </div>
        </div>
    );
};
