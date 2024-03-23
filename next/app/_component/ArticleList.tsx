import { unstable_cache } from "next/cache";
import Link from "next/link";

import prisma from "@/app/util/prisma";

// サイドバーに表示する記事一覧コンポーネント
export const ArticleList = async () => {
    // prismaでのデータフェッチをキャッシュ
    const posts = await unstable_cache(async () => {
        return await prisma.posts.findMany();
    })();

    posts.sort((i, j) => {
        if (!i.create_date) return 1;
        if (!j.create_date) return -1;
        return new Date(j.create_date).getTime() - new Date(i.create_date).getTime();
    });

    return (
        <ul className="menu min-h-full">
            {posts.map((post, index) => (
                <li key={index}>
                    <Link
                        className="btn btn-ghost max-w-[fit-content] text-left"
                        href={`/post/${post.title}`}
                        scroll={true}
                        aria-label={post.title}
                    >
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
