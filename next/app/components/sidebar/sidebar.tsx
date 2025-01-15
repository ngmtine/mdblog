"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Title } from "~/app/components/title";
import { checkIsWide } from "~/app/util/checkIsWide";
import { ToggleDarkmodeButton } from "./toggleDarkmodeButton";
import { ToggleSidebarButton } from "./toggleSidebarButton";
import { TwitterLink } from "./twitterLink";

interface Props {
    children: ReactNode;
}

export const Sidebar = ({ children }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // ウィンドウリサイズに応じて閉じる
    useEffect(() => {
        const handleResize = () => {
            checkIsWide() ? setIsSidebarOpen(true) : setIsSidebarOpen(false);
        };
        handleResize(); // 初回実行
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const sidebarElement = document.getElementById("sidebar");
            const target = event.target as HTMLElement;

            // 画面幅が広い場合はサイドバーを閉じない
            if (checkIsWide()) return;

            // サイドバー外クリックで閉じる
            if (sidebarElement && isSidebarOpen && !sidebarElement.contains(target)) {
                setIsSidebarOpen(false);
                return;
            }

            // サイドバー内のリンククリックで閉じる
            if (target.tagName === "A" && sidebarElement?.contains(target)) {
                setIsSidebarOpen(false);
                return;
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isSidebarOpen]);

    return (
        <div id="sidebar">
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
