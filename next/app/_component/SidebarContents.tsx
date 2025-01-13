"use client";

import { type ReactNode, useEffect } from "react";

import { useAtom } from "jotai";

import { ToggleDarkmodeButton } from "./ToggleDarkmodeButton";
import { TwitterLink } from "./TwitterLink";
import { sidebarState } from "./sidebarAtom";

type Props = {
    children: ReactNode; // 記事一覧
};

export const SidebarContents = ({ children }: Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarState);

    // ウィンドウリサイズに応じてisSidebarOpenをfalseにする
    useEffect(() => {
        const handleResize = () => {
            if (checkIsWide()) setIsSidebarOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsSidebarOpen]);

    // サイドバー内のリンククリックしたらサイドバー閉じる
    useEffect(() => {
        const handleClick = (event: any) => {
            if (event.target.tagName === "A" || event.target.id === "moon") {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [setIsSidebarOpen]);

    // サイドバーの外側をクリックしたらサイドバー閉じる
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const sidebarElement = document.getElementById("Sidebar");

            if (sidebarElement && isSidebarOpen && !sidebarElement.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isSidebarOpen, setIsSidebarOpen]);

    return (
        <div
            id="Sidebar"
            className={`light:bg-iceberg-light lg:light:bg-transparent fixed left-0 top-0 z-10 h-full w-80 -translate-x-full bg-iceberg-light p-4 transition-transform duration-300 ease-in-out dark:bg-iceberg-dark lg:translate-x-0 lg:bg-transparent 
            lg:dark:bg-transparent 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
    // memo: windowオブジェクトはuseEfect外では使用しない
    // https://dev-k.hatenablog.com/entry/how-to-access-the-window-object-in-nextjs-dev-k
    // ただしこのように関数化してる場合は大丈夫っぽい
    const threshold = 1024; // tailwindのlg相当
    return window.innerWidth >= threshold;
};
