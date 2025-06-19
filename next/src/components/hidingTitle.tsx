"use client";

import { useEffect, useState } from "react";
import { DEFAULT_THRESHOLD } from "./sidebar/useResponsiveSidebar";
import { Title } from "./title";

export const HidingTitle = () => {
    const [animationClass, setAnimationClass] = useState("hidden");

    // ウィンドウリサイズに応じて表示を切り替える
    useEffect(() => {
        const handleResize = () => {
            window.innerWidth >= DEFAULT_THRESHOLD ? setAnimationClass("hidden") : setAnimationClass("");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header //
            id="hidingTitle"
            className={`mt-2 -mb-2 ml-2 transition-transform duration-300 ease-in-out ${animationClass}`}
        >
            <Title />
        </header>
    );
};
