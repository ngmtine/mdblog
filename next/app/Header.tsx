import Link from "next/link";

import { SidebarButton } from "./SidebarButton";

const blogTitle = "真・フランス料理紹介ブログ";

type Props = {
    searchParams: {
        [key: string]: string;
    };
};

export const Header = ({ searchParams }: Props) => {
    return (
        <div
            id="header"
            className="navbar fixed z-10 flex h-14 w-screen backdrop-blur-sm"
        >
            <SidebarButton isOpen={searchParams.sidebar === ""} />
            <div className="btn btn-ghost ml-10 text-xl">
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

/*

Tailwind CSS でデフォルトで設定されている、幅、高さ、余白などの Spacing 単位は、1 = 0.25rem = 4px です

---

page.js以外でurlクエリパラメータを取得するにはpropsで受け取ればいいっぽい？

*/
