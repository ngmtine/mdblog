import { ArticleLoader } from "~/components/articleLoader";
import { executeQuery } from "~/lib/executeQuery";
import type { Post } from "~/lib/types";

const Home = async () => {
    // 最新10件の記事取得
    const getInitialPostsQuery = `
SELECT
    id, title, summary, content, create_date
FROM
    mdblog.posts
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "WHERE published = true" : ""}
ORDER BY
    create_date DESC
LIMIT 10
;`;
    const initialPosts = await executeQuery<Post>(getInitialPostsQuery);

    if (!initialPosts || initialPosts.length === 0) {
        return <main>ナイスな記事が無いす</main>;
    }

    // 全体の記事数を取得
    const getPostsCountQuery = `
SELECT
    COUNT(*)::integer
FROM
    mdblog.posts
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "WHERE published = true" : ""}
;`;
    const postsCount = await executeQuery<{ count: number }>(getPostsCountQuery);

    // 初期状態でさらに読み込む記事があるかどうか
    const isLoadable = initialPosts.length < postsCount[0].count && initialPosts.length >= 10;

    return (
        // 記事一覧
        <ArticleLoader //
            initialPosts={initialPosts}
            isLoadable={isLoadable}
        />
    );
};

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default Home;
