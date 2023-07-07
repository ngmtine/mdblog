"use client";

import styled from "styled-components";

const DynamicBackground = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
})`
    position: fixed;
    top: 0;
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
