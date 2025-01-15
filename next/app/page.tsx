import { Summary } from "./components/summary";
import { executeQuery } from "./util/executeQuery";
import type { Post } from "./util/types";

const queryStr = `
SELECT
    id, title, summary, content, create_date
FROM
    mdblog.posts
WHERE
    published = true
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

export default Home;
