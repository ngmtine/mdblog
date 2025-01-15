import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

export const Header = () => (
    <header id="header" className="navbar">
        <TitleButton />
    </header>
);

const TitleButton = () => (
    <Link id="titleButton" href={"/"} className="z-30 lg:absolute">
        <div className="btn btn-ghost text-xl">{blogTitle}</div>
    </Link>
);
