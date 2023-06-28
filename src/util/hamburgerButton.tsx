"use client";

const HamburgerButton = ({ callback }) => {
    return (
        <div>
            <button onClick={callback}>button</button>
        </div>
    );
};

export default HamburgerButton;
