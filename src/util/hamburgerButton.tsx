"use client";

import { useState } from "react";
// import { toggleSidebar } from "./hamburger";

const HamburgerButton = ({ callback }) => {
    return (
        <>
            <button onClick={callback}>button</button>
        </>
    );
};

export default HamburgerButton;
