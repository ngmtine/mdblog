import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "~/app/components/article";
import { executeQuery } from "~/app/util/executeQuery";
import type { Post as PostType } from "~/app/util/types";

const queryStr = `
SELECT
    id, title, content, create_date
FROM
    mdblog.posts
WHERE
    title = $1
    ${process.env.NODE_ENV === "production" ? "AND published = true" : ""}
LIMIT 1
;`;

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    try {
        const { title } = await params;
        const decodedTitle = decodeURIComponent(title);
        const posts = await executeQuery<PostType>(queryStr, [decodedTitle]);

        if (!posts || posts.length === 0) {
            return {
                title: "記事が見つかりません",
                description: "このページは存在しません。",
            };
        }

        const post = posts[0];

        const description = post.content.slice(0, 100);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const ogpUrl = `${baseUrl}/api/ogp?title=${title}`;

        return {
            title: post.title,
            description,
            openGraph: {
                title: post.title,
                description,
                url: `${baseUrl}/post/${encodeURIComponent(title)}`,
                images: [{ url: ogpUrl, width: 1200, height: 630 }],
                type: "article",
                publishedTime: post.create_date.toString(),
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description,
                images: [ogpUrl],
            },
        };
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return notFound();
    }
};

interface Props {
    params: Promise<{
        title: string;
    }>;
}

const Page = async ({ params }: Props) => {
    try {
        const { title } = await params;
        const decodedTitle = decodeURIComponent(title);

        const posts = await executeQuery<PostType>(queryStr, [decodedTitle]);

        if (!posts || posts.length === 0) return notFound();
        const post = posts[0];

        return <Article post={post} />;
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return notFound();
    }
};

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default Page;
