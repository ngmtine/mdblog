import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

export const Header = () => {
    return (
        <div
            id="Header"
            className="navbar fixed z-20 flex h-14 w-screen backdrop-blur-sm"
        >
            <div className="btn btn-ghost text-xl">
                <Link
                    href={"/"}
                    scroll={false}
                >
                    {blogTitle}
                </Link>
            </div>
        </div>
    );
};
