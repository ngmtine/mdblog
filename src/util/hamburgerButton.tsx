type HamburgerButtonProps = {
    callback: () => void;
};

const HamburgerButton = ({ callback }: HamburgerButtonProps) => {
    return (
        <>
            <button onClick={callback}>button</button>
        </>
    );
};

export default HamburgerButton;
