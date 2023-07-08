"use client";

import { toggleScheme } from "./colorScheme";
import { useRouter } from "next/navigation";

const ColorSchemeToggleButton = () => {
    const router = useRouter();
    const toggle = async () => {
        console.log("Toggling dark mode...");
        await toggleScheme();
        router.refresh();
    };

    return (
        <button type="button" className="rounded-sm bg-zinc-900 dark:bg-zinc-100" onClick={toggle}>
            <span className="inline-block text-sm dark:hidden text-zinc-100">toggle</span>
            {/* <span className="hidden text-sm dark:inline-block text-zinc-800">Switch to Light</span> */}
        </button>
    );
};

export default ColorSchemeToggleButton;
