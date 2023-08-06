"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import SvgHamburgerButton from "@/util/svgHamburgerButton";

interface Props {
    children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
    if (typeof window === "undefined") throw new Error();

    const threshold = 768;
    const sidebarRef = useRef(null);

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

    // 画面幅が閾値以下ならばtrue
    const isNarrow = window.innerWidth < threshold;

    // サイドバーに付与するtailwindクラス
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
    };

    // クリック時に呼ばれるコールバック関数 条件に応じてsetDisplayClassを呼ぶ
    const toggleSidebarStateWithClick = () => {
        if (window.innerWidth < threshold) {
            setDisplayClass(displayClass === "hidden" ? "block" : "hidden");
        } else {
            setDisplayClass("block");
        }
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
