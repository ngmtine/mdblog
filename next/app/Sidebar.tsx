"use client";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";

import { SvgMoonToggle } from "./util/SvgMoonToggle";

type Props = {
    isOpen: boolean;
};

export const Sidebar = ({ isOpen }: Props) => {
    console.log(`Sidebar: {isOpen: ${isOpen}}`);

    const router = useRouter();

    // urlクエリパラメータで取得されるisOpenに対して、ウィンドウ幅に応じて可変のisOpenDynamicを保持
    const [isOpenDynamic, setIsOpenDynamic] = useState(isOpen);

    // useClickAwayの判定のためにサイドバーの参照を保持
    const ref = useRef(null);

    useEffect(() => {
        // ウィンドウ幅に基づいてサイドバーの状態を更新する関数
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpenDynamic(true);
            } else {
                setIsOpenDynamic(isOpen);
            }
        };

        // イベントリスナーの設定
        window.addEventListener("resize", handleResize);

        // 初期状態のチェック
        handleResize();

        // クリーンアップ関数
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    // サイドバー開閉ハンドラ（要素外クリックで発火）
    const handleSidebarToggle = () => {
        console.log("Sidebar: handleSidebarToggle");
        setIsOpenDynamic(false);
        router.replace("/", { scroll: false });
    };

    // 要素外クリックを検知するフック
    useClickAway(ref, () => {
        handleSidebarToggle();
    });

    return (
        <div
            id={"sidebar"}
            ref={ref}
            className={`fixed left-0 top-0 z-10 h-full w-80 bg-iceberg-light p-4 text-gray-900 opacity-95 transition-transform duration-300  ease-in-out dark:bg-iceberg-dark dark:text-gray-300 ${isOpenDynamic ? "translate-x-0" : "-translate-x-full"}`}
        >
            <ul //
                className="menu min-h-full"
            >
                <li>
                    <a>Sidebar Item 1</a>
                </li>
                <li>
                    <a>Sidebar Item 2</a>
                </li>
            </ul>
            <SvgMoonToggle />
        </div>
    );
};
