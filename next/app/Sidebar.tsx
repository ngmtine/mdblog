"use client";

import { useRouter } from "next/navigation";

export const Sidebar = () => {
    console.log(`Sidebar`);

    const router = useRouter();

    const handleSidebarToggle = () => {
        console.log("Sidebar: handleSidebarToggle");
        router.push("/", { scroll: false });
    };

    return (
        <div //
            onClick={(e) => e.target === e.currentTarget && handleSidebarToggle()}
            className={"drawer-side"}
        >
            <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
                <li>
                    <a>Sidebar Item 1</a>
                </li>
                <li>
                    <a>Sidebar Item 2</a>
                </li>
            </ul>
        </div>
    );
};
