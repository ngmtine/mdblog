const randomTop = (() => {
    const min = -30;
    const max = 70;
    return Math.floor(Math.random() * (max - min + 1)) + min;
})();

const style = {
    position: "fixed",
    top: `${randomTop}vh`,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
} as const;

const Background = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style}>
            <circle cx="300" cy="300" r="100" fill="blue" />
        </svg>
    );
};

export default Background;
