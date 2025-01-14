import { MetaTags } from "@/app/_component/MetaTags";
import { Post } from "@/app/_component/Post";
import type { Post as PostType } from "@/app/types";
import { executeQuery } from "@/app/util/executeQuery";
import { notFound } from "next/navigation";

const queryStr = `
SELECT
    -- id, title, content, image, create_date
    id, title, content, create_date
FROM
    mdblog.posts
WHERE
    title = $1
    AND published = true
LIMIT 1
;`;

interface Props {
    params: {
        title: string;
    };
}

const PostPage = async ({ params }: Props) => {
    const { title } = await params;
    const decodedTitle = decodeURIComponent(title);

    try {
        const posts = await executeQuery<PostType>(queryStr, [decodedTitle]);

        if (!posts || posts.length === 0) return notFound();
        const post = posts[0];

        // メタデータの設定
        const description = post.content.slice(0, 100); // 記事冒頭100文字
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${encodeURIComponent(title)}`;
        // const image = post?.image || "default.jpg";

        return (
            <MetaTags //
                title={post.title}
                description={description}
                url={url}
                // image={image}
                // image={"default.jpg"}
            >
                <Post post={post} />
            </MetaTags>
        );
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return notFound();
    }
};

export default PostPage;

export const dynamic = "force-static";
export const revalidate = 60; // ISR: キャッシュを60秒ごとに再生成可能
