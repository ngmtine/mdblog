"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { ToggleDarkmodeButton } from "./toggleDarkmodeButton";
import { TwitterLink } from "./twitterLink";

interface Props {
    children: ReactNode; // 記事一覧
    isSidebarOpen: boolean;
    onClose: () => void;
}

export const SidebarContents = ({ children, isSidebarOpen, onClose }: Props) => {
    // ウィンドウリサイズ時にサイドバーを閉じる
    useEffect(() => {
        const handleResize = () => {
            if (checkIsWide()) onClose();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [onClose]);

    // サイドバー外クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.getElementById("Sidebar");
            if (sidebarElement && isSidebarOpen && !sidebarElement.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isSidebarOpen, onClose]);

    return (
        <div
            id="sidebarContents"
            className={`fixed left-0 top-0 z-10 h-full w-80 bg-iceberg-light p-4 transition-transform duration-300 ease-in-out dark:bg-iceberg-dark ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* ヘッダー幅だけ余白つくる */}
            <div className="mt-10" />

            {/* 記事リスト */}
            {children}

            {/* ボタンとか */}
            <div id="buttonArea" className="fixed bottom-0 mb-1 ml-10 lg:ml-0">
                <div className="ml-1 inline-block">
                    <ToggleDarkmodeButton />
                </div>
                <div className="ml-2 inline-block">
                    <TwitterLink />
                </div>
            </div>
        </div>
    );
};

const checkIsWide = () => {
    const threshold = 1024; // Tailwind の `lg` に相当
    return window.innerWidth >= threshold;
};
