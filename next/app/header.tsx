import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

const Header = () => {
    return (
        <div id="header" className="navbar fixed z-10 flex h-14 w-screen backdrop-blur-sm">
            <div className="btn btn-ghost ml-10 text-xl">
                <Link href={"/"}>{blogTitle}</Link>
            </div>
        </div>
    );
};

export default Header;

// Tailwind CSS でデフォルトで設定されている、幅、高さ、余白などの Spacing 単位は、1 = 0.25rem = 4px です
