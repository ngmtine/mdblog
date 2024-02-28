"use client";

import { SvgMoonToggle } from "./util/SvgMoonToggle";

export const Sidebar = () => {
    return (
        <div
            id={"sidebar"}
            className="fixed left-0 top-0 z-10 h-full w-80 -translate-x-full bg-iceberg-light p-4 text-gray-900 opacity-95 transition-transform duration-300 ease-in-out dark:bg-iceberg-dark dark:text-gray-300 lg:translate-x-0"
        >
            <ul className="menu min-h-full">
                <li>
                    <a>Sidebar Item 1</a>
                </li>
                <li>
                    <a>Sidebar Item 2</a>
                </li>
            </ul>
            <SvgMoonToggle />
        </div>
    );
};
