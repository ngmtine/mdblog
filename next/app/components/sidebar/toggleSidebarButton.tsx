import { Hamburger } from "~/app/components/svg/hamburger";

interface Props {
    handleClick: () => void;
}

export const ToggleSidebarButton = ({ handleClick }: Props) => (
    <button
        id="toggleSidebarButton"
        type="button"
        className="fixed bottom-0 z-50 mb-3 ml-3 inline-block translate-y-0 transition-transform duration-300 ease-in-out lg:translate-y-11"
        onClick={handleClick}
        aria-label="toggle sidebar button"
    >
        <Hamburger />
    </button>
);
