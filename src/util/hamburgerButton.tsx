"use client";

import { useRouter } from "next/navigation";
import { toggleSidebar } from "./hamburger";

const HamburgerButton = () => {
    const router = useRouter();
    const callback = async () => {
        await toggleSidebar();
        router.refresh();
    };

    return (
        <div>
            <button onClick={callback}>button</button>
        </div>
    );
};

export default HamburgerButton;
