"use client";

import { useEffect, ReactNode } from "react";

import { useAtom } from "jotai";

import { sidebarState } from "./sidebarAtom";
import { ToggleDarkmodeButton } from "./ToggleDarkmodeButton";
import { TwitterLink } from "./TwitterLink";

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

        // イベントリスナーの設定
        window.addEventListener("resize", handleResize);

        // クリーンアップ関数
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsSidebarOpen]);

    return (
        <div
            id="Sidebar"
            className={`light:bg-iceberg-light lg:light:bg-iceberg-light fixed left-0 top-0 z-10 h-full w-80 -translate-x-full p-4 text-gray-900 transition-transform 
            duration-300 ease-in-out dark:bg-iceberg-dark dark:text-gray-300 lg:translate-x-0
            lg:dark:bg-transparent ${isSidebarOpen ? "translate-x-0 bg-iceberg-light" : "-translate-x-full "}`}
        >
            {/* ヘッダー幅だけ余白つくる */}
            <div className="mt-10" />

            {/* 記事リスト */}
            {children}

            {/* ボタンとか */}
            <div
                id="buttonArea"
                className="fixed bottom-0 mb-1 ml-10 lg:ml-0"
            >
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
