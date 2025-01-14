"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
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
            <ToggleSidebarButton handleClick={toggleSidebar} />
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
        </div>
    );
};

const checkIsWide = () => {
    // FIXME: windowオブジェクトはuseEfect外では使用しない
    // https://dev-k.hatenablog.com/entry/how-to-access-the-window-object-in-nextjs-dev-k
    // ただしこのように関数化してる場合は大丈夫っぽい
    // というのはv14の話、v15はそのうち検証する
    const threshold = 1024; // Tailwind の `lg` に相当
    console.log(window);
    return window.innerWidth >= threshold;
};
