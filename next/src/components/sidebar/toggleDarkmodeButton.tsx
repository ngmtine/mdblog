"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";

export const ToggleDarkmodeButton = () => {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button //
            type="button"
            onClick={handleToggle}
            aria-label="toggle darkmode button"
            className="cursor-pointer"
        >
            <FaMoon className="h-9 w-9" />
        </button>
    );
};
