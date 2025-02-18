import { Summary } from "./components/summary";
import { executeQuery } from "./util/executeQuery";
import type { Post } from "./util/types";

const queryStr = `
SELECT
    id, title, summary, content, create_date
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
ORDER BY
    create_date DESC
LIMIT 10;
`;

const Home = async () => {
    const posts = await executeQuery<Post>(queryStr);

    if (!posts || posts.length === 0) {
        return <main>ナイスな記事が無いす</main>;
    }

    return (
        <>
            {/* 記事概要 */}
            {posts.map((post) => (
                <Summary key={post.id} post={post} />
            ))}
        </>
    );
};

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default Home;
