"use client";

import { toggleScheme } from "./colorScheme";
import { useRouter } from "next/navigation";

const d = "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z";

const ColorSchemeToggleButton = () => {
    const router = useRouter();
    const toggle = async () => {
        console.log("Toggling dark mode...");
        await toggleScheme();
        router.refresh();
    };

    return (
        <button type="button" className="" onClick={toggle}>
            <svg id="moon" xmlns="http://www.w3.org/2000/svg" width="1.94rem" height="1.94rem" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
            </svg>
        </button>
    );
};

export default ColorSchemeToggleButton;
