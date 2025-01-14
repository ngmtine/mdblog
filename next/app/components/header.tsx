import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

export const Header = () => (
    <div id="header" className="navbar fixed z-20 flex h-14 w-screen">
        <TitleButton />
    </div>
);

const TitleButton = () => (
    <Link id="titleButton" href={"/"}>
        <div className="btn btn-ghost text-xl backdrop-blur-sm">{blogTitle}</div>
    </Link>
);
