"use client";

import React, { useState } from "react";

const HamburgerButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };

    return (
        <div>
            <button onClick={toggle}>button</button>
        </div>
    );
};

export default HamburgerButton;
