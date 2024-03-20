import Link from "next/link";

import prisma from "@/app/util/prisma";

// サイドバーに表示する記事一覧コンポーネント
export const ArticleList = async () => {
    const posts = await prisma.posts.findMany();
    posts.reverse();

    return (
        <ul className="menu min-h-full">
            {posts.map((post, index) => (
                <Link
                    key={index}
                    className="btn btn-ghost max-w-[fit-content] text-left"
                    href={`/post/${post.title}`}
                >
                    {post.title}
                </Link>
            ))}
        </ul>
    );
};
