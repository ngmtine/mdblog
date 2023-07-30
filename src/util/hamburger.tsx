export const getCurrentSidebarState = async () => {
    //
};

export const toggleSidebar = async () => {
    const state = await getCurrentSidebarState();
    const newState = state === "close" ? "open" : "close";

    return newState;
};
