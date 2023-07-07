const randomTop = (() => {
    const min = -30;
    const max = 70;
    return Math.floor(Math.random() * (max - min + 1)) + min;
})();

const randomLeft = (() => {
    const min = 0;
    const max = 70;
    return Math.floor(Math.random() * (max - min + 1)) + min;
})();

const style = {
    position: "fixed",
    // top: `${randomTop}vh`,
    // left: `${randomLeft}vh`,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
} as const;

const Background = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style}>
            <ellipse cx="300" cy="300" rx="100" ry="30" fill="rgba(0, 0, 255, 0.3)" filter="blur(1.5rem)" />
        </svg>
    );
};

export default Background;
