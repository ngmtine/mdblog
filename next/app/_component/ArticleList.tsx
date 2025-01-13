import Link from "next/link";
import type { Post as PostType } from "../types";
import { executeQuery } from "../util/executeQuery";

const getPostsQuery = `
SELECT
    id, title, create_date, content
FROM
    mdblog.posts
WHERE
    published = true
ORDER BY
    create_date DESC
;`;

// サイドバーに表示する記事一覧コンポーネント
export const ArticleList = async () => {
    const posts = await executeQuery<PostType>(getPostsQuery);

    if (!posts || !posts.length) {
        return <div>No articles found</div>;
    }

    return (
        <ul className="menu min-h-full">
            {posts.map((post) => (
                <li key={post.id}>
                    <Link //
                        className="btn btn-ghost max-w-[] text-left"
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

export const dynamic = "force-static";
