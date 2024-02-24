import Link from "next/link";

const blogTitle = "真・フランス料理紹介ブログ";

const Header = () => {
    return (
        <div id="header">
            <div>
                <Link href={"/"}>{blogTitle}</Link>
            </div>
        </div>
    );
};

export default Header;
