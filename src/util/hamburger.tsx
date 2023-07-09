import { getCookie, setCookie } from "cookies-next";

export const getCurrentSidebarState = async () => {
    if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        return cookies().has("sidebar") ? cookies().get("sidebar")?.value : "open";
    }
    return getCookie("sidebar", { path: "/" });
};

export const toggleSidebar = async () => {
    const state = await getCurrentSidebarState();
    const newState = state === "close" ? "open" : "close";

    setCookie("sidebar", newState, {
        path: "/",
    });

    return newState;
};
