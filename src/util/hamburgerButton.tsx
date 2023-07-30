"use client";

import { useState } from "react";
// import { toggleSidebar } from "./hamburger";

const HamburgerButton = ({ callback }) => {
    return (
        <div>
            <button onClick={callback}>button</button>
        </div>
    );
};

export default HamburgerButton;
