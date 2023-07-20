"use client";

import { useState, useEffect } from "react";

const Sidebar = ({ children }) => {
    if (typeof window === "undefined") throw new Error();

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        // コンポーネントのアンマウント時にイベントリスナーをクリーンアップします
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const displayClass = windowSize.width < 768 ? "hidden" : "block";

    return (
        <div className={`w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 block ${displayClass}`}>
            <p>ウィンドウの幅: {windowSize.width}px</p>
            <p>ウィンドウの高さ: {windowSize.height}px</p>
            {children}
        </div>
    );
};

export default Sidebar;
