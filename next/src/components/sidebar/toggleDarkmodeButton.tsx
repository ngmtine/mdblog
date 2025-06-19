"use client";

import { useTheme } from "next-themes";
import { Moon } from "~/components/svg/moon";

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
        <button //
            id="toggleDarkmodeButton"
            type="button"
            onClick={handleToggle}
            aria-label="toggle darkmode button"
        >
            <Moon />
        </button>
    );
};
