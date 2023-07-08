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
    const cy = `${getRandInt({ min: 10, max: 30 })}%`;
    const rx = `${getRandInt({ min: 500, max: 600 })}px`;
    const ry = `${getRandInt({ min: 70, max: 100 })}px`;
    const rotate = `rotate(${getRandInt({ min: -30, max: 30 })})`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0, 0, 255, 0.03)" filter="blur(2rem) drop-shadow(100px 100px 2px blue)" transform={rotate} />
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0, 0, 255, 0.03)" filter="blur(2rem) drop-shadow(-100px -100px 2px red)" transform={rotate} />
        </svg>
    );
};

export default Background;
