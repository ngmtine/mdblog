type HamburgerButtonProps = {
    callback: () => void;
};

const inlineStyle = {
    display: "inline-block",
};

const HamburgerButton = ({ callback }: HamburgerButtonProps) => {
    return (
        <>
            <button onClick={callback}>
                <svg className="text-gray-800 dark:text-white" style={inlineStyle} xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 17 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
        </>
    );
};

export default HamburgerButton;
