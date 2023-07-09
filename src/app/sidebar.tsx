import HamburgerButton from "@/util/hamburgerButton";
import ColorSchemeToggleButton from "@/util/colorSchemeToggleButton";
import TwitterIcon from "@/util/twitterIcon";

const Sidebar = ({ children }) => {
    // children: PostList
    return (
        <div id="leftSideBar" className="w-64 p-4 h-screen overflow-y-scroll overflow-x-hidden pt-20 hidden md:block">
            {children}
            <div className="fixed bottom-0 flex">
                <div className="flex items-center justify-center mt-3">
                    <ColorSchemeToggleButton />
                    <TwitterIcon />
                    <HamburgerButton />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
