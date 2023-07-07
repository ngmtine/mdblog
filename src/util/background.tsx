"use client";

import styled from "styled-components";

const randomTop = (() => {
    const min = -30;
    const max = 70;
    return Math.floor(Math.random() * (max - min + 1)) + min;
})();

const DynamicBackground = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
})`
    position: fixed;
    top: ${randomTop}vh;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
`;

const Background = () => {
    return (
        <DynamicBackground>
            <circle cx="300" cy="300" r="100" fill="blue" />
        </DynamicBackground>
    );
};

export default Background;
