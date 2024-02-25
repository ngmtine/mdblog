"use client";

import { useRef } from "react";

import { useRouter } from "next/navigation";
import { useClickAway } from "react-use";

import { SvgMoonToggle } from "./util/SvgMoonToggle";

type Props = {
    isOpen: boolean;
};

export const Sidebar = ({ isOpen }: Props) => {
    console.log(`Sidebar: {isOpen: ${isOpen}}`);

    const router = useRouter();

    // useClickAwayの判定のためにサイドバーの参照を保持
    const ref = useRef(null);

    // サイドバー開閉ハンドラ（要素外クリックで発火）
    const handleSidebarToggle = () => {
        console.log("Sidebar: handleSidebarToggle");
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
            className={`fixed left-0 top-0 z-10 h-full w-80 bg-base-200 p-4 text-base-content transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
