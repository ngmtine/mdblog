"use client";

import { useTheme } from "next-themes";

import { SvgMoon } from "./svg/SvgMoon";

export const ToggleDarkmodeButton = () => {
    const { setTheme, theme } = useTheme();

    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <button id="ToggleDarkmodeButton" type="button" onClick={handleToggle} aria-label="toggle darkmode button">
            <SvgMoon />
        </button>
    );
};
