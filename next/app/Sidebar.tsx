"use client";

import { useState, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";

import { SvgMoonToggle } from "./util/SvgMoonToggle";

const threshold = 768;

const checkIsWide = () => {
    // memo: windowオブジェクトはuseEfect外では使用しない
    // https://dev-k.hatenablog.com/entry/how-to-access-the-window-object-in-nextjs-dev-k
    // ただし以下のように関数化してる場合は大丈夫っぽい
    const isWide = window.innerWidth >= threshold;
    console.log(`Sidebar: {isWide: ${isWide}}`);
    return isWide;
};

type Props = {
    isOpen: boolean;
};

export const Sidebar = ({ isOpen }: Props) => {
    const router = useRouter();

    // useClickAwayの判定のためにサイドバーの参照を保持
    const ref = useRef(null);

    // urlクエリパラメータで取得されるisOpenに対して、ウィンドウ幅に応じて可変のisOpenDynamicを保持
    const [isOpenDynamic, setIsOpenDynamic] = useState<boolean>();

    // isOpenDynamicの初期値
    useEffect(() => {
        const isWide = checkIsWide();
        setIsOpenDynamic(isOpen ?? isWide);
    }, [isOpen]);

    // ウィンドウリサイズに応じてsetIsOpenDynamicを実行
    useEffect(() => {
        const handleResize = () => {
            const isWide = checkIsWide();
            if (isWide && isOpen) {
                setIsOpenDynamic(true);
                router.replace("/?sidebar", { scroll: false });
            } else {
                router.replace("/", { scroll: false });
                setIsOpenDynamic(false);
            }
        };

        // イベントリスナーの設定
        window.addEventListener("resize", handleResize);

        // クリーンアップ関数
        return () => window.removeEventListener("resize", handleResize);
    }, [router, isOpen]);

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
