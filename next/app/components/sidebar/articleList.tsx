import Link from "next/link";
import { encodeUrl } from "~/app/util/encodeUrl";
import { executeQuery } from "~/app/util/executeQuery";
import type { Post as PostType } from "~/app/util/types";

const getLatestPostsQuery = `
SELECT
    id, title, create_date, content
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
ORDER BY
    create_date DESC
LIMIT
    5
;`;

// サイドバーに表示する記事一覧コンポーネント
export const ArticleList = async () => {
    const posts = await executeQuery<PostType>(getLatestPostsQuery);

    if (!posts || !posts.length) {
        return <div>ナイスな記事が無いす</div>;
    }

    return (
        <ul id="articleList" className="menu">
            {posts.map((post) => (
                <li key={post.id}>
                    <Link //
                        className="btn btn-ghost max-w-[min(100%,-webkit-fill-available)] inline-flex justify-start text-left"
                        href={`/post/${encodeUrl(post.title)}`}
                        aria-label={post.title}
                    >
                        {post.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
