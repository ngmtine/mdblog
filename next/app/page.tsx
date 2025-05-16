import { ArticleLoader } from "./components/articleLoader";
// import { Summary } from "./components/summary";
import { executeQuery } from "./util/executeQuery";
import type { Post } from "./util/types";

// 最新10件の記事取得クエリ
const getInitialPostsQuery = `
SELECT
    id, title, summary, content, create_date
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
ORDER BY
    create_date DESC
LIMIT 10
;`;

// 全体の記事数を取得クエリ（hasMoreの初期判定に使用）
const getPostsCountQuery = `
SELECT
    COUNT(*)::integer
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
;`;

const Home = async () => {
    const initialPosts = await executeQuery<Post>(getInitialPostsQuery);

    if (!initialPosts || initialPosts.length === 0) {
        return <main>ナイスな記事が無いす</main>;
    }

    // 初期状態でさらに読み込む記事があるかどうか
    const postsCount = await executeQuery<{ count: number }>(getPostsCountQuery);
    const isLoadable = initialPosts.length < postsCount[0].count && initialPosts.length >= 10;

    return (
        <>
            {/* 記事概要 */}
            <ArticleLoader //
                initialPosts={initialPosts}
                isLoadable={isLoadable}
            />
        </>
    );
};

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default Home;
