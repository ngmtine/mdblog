"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

import SvgHamburgerButton from "@/app/util/svgHamburgerButton";

interface Props {
    children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
    if (typeof window === "undefined") throw new Error();

    const threshold = 768;
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // 現在のウィンドウサイズ
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 直前のウィンドウサイズ
    const [prevWindowSize, setPrevWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // サイドバーの表示状態を表すブール値
    const [isSidebarHidden, setIsSidebarHidden] = useState(true);

    // サイドバーに付与するtailwindクラス
    const isNarrow = window.innerWidth < threshold;
    const [displayClass, setDisplayClass] = useState(isNarrow ? "hidden" : "block");

    // リサイズ時に呼ばれるコールバック関数 条件に応じてsetDisplayClassを呼ぶ
    const toggleSidebarStateWithResize = () => {
        setPrevWindowSize({
            width: windowSize.width,
            height: windowSize.height,
        });

        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const isWindowExpanding = prevWindowSize.width < threshold && threshold <= windowSize.width;
        const isWindowShrinking = prevWindowSize.width > threshold && threshold >= windowSize.width;

        if (isWindowExpanding) setDisplayClass("block");
        if (isWindowShrinking) setDisplayClass("hidden");

        setIsSidebarHidden(true);
    };

    // クリック時に呼ばれるコールバック関数 条件に応じてsetDisplayClassを呼ぶ
    const toggleSidebarStateWithClick = () => {
        const isNarrow = window.innerWidth < threshold;

        if (isNarrow && isSidebarHidden) setDisplayClass("block");
        if (isNarrow && !isSidebarHidden) setDisplayClass("hidden");
        if (!isNarrow && isSidebarHidden) setDisplayClass("hidden");
        if (!isNarrow && !isSidebarHidden) setDisplayClass("block");

        setIsSidebarHidden(!isSidebarHidden);
    };

    // クリックされたエレメントがサイドバーの外部であれば、サイドバーを隠す
    const handleDocumentClick = (event: MouseEvent) => {
        if (threshold <= window.innerWidth) return;

        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setDisplayClass("hidden");
        }
    };

    // windowSizeを監視し、コンポーネントが再レンダリングされる度にイベントリスナーを再登録する
    useEffect(() => {
        window.addEventListener("resize", toggleSidebarStateWithResize);
        document.addEventListener("click", handleDocumentClick);

        // useEffectのクリーンアップ関数（return文で指定した関数）は、コンポーネントがアンマウントされる際（つまり画面から消える際）にイベントリスナーを削除する
        return () => {
            window.removeEventListener("resize", toggleSidebarStateWithResize);
            document.removeEventListener("click", handleDocumentClick);
        };

        // prevWindowSizeが変更されるとき、windowSizeも必ず変更されているため、prevWindowSizeは監視する必要はなく、その警告の抑制
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowSize, displayClass]);

    return (
        <>
            <div className="fixed ml-3 bottom-3">
                <SvgHamburgerButton callback={toggleSidebarStateWithClick} />
            </div>
            <div ref={sidebarRef} className={`w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 block ${displayClass}`}>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
