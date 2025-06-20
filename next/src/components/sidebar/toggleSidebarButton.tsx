import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
    handleClick: () => void;
}

export const ToggleSidebarButton = ({ handleClick }: Props) => (
    <button //
        id="toggleSidebarButton"
        type="button"
        onClick={handleClick}
        aria-label="toggle sidebar button"
        className="cursor-pointer"
    >
        <RxHamburgerMenu className="h-11 w-11" />
    </button>
);
