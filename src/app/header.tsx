import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

const Header = () => {
    return (
        <div id="header" className="h-14 z-10 w-full backdrop-blur-sm text-gray-900 dark:text-gray-300 flex items-center fixed">
            <div className="ml-5 md:ml-3 2xl:ml-0">
                <Link href={"/"} className="text-xl font-semibold mb-5">
                    {blogTitle}
                </Link>
            </div>
        </div>
    );
};

export default Header;
