const getRandInt = ({ min = 0, max = 100 } = {}) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const style = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
} as const;

const Background = () => {
    const cx = `${getRandInt()}%`;
    const cy = `${getRandInt()}%`;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style}>
            <ellipse cx={cx} cy={cy} rx="100" ry="30" fill="rgba(0, 0, 255, 0.3)" filter="blur(1.5rem)" />
        </svg>
    );
};

export default Background;
