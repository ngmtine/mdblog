import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "~/components/article";
import { PrevNextPostLink } from "~/components/prevNextPostLink";
import { decodeUrl } from "~/lib/encodeUrl";
import { executeQuery } from "~/lib/executeQuery";
import type { Post as PostType } from "~/lib/types";

const getPostQuery = `
SELECT
    id, title, content, create_date
FROM
    mdblog.posts
WHERE
    title = $1
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "AND published = true" : ""}
LIMIT 1
;`;

// 前の記事を取得するクエリ
const getPrevPostQuery = `
SELECT
    title
FROM
    mdblog.posts
WHERE
    create_date < (SELECT create_date FROM mdblog.posts WHERE title = $1)
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "AND published = true" : ""}
ORDER BY
    create_date DESC
LIMIT 1
;`;

// 次の記事を取得するクエリ
const getNextPostQuery = `
SELECT
    title
FROM
    mdblog.posts
WHERE
    create_date > (SELECT create_date FROM mdblog.posts WHERE title = $1)
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "AND published = true" : ""}
ORDER BY
    create_date ASC
LIMIT 1
;`;

interface Props {
    params: Promise<{ title: string }>;
}

const PostPage = async ({ params }: Props) => {
    try {
        const { title } = await params;
        const decodedTitle = decodeUrl(title);

        const [posts, prevPosts, nextPosts] = await Promise.all([
            executeQuery<PostType>(getPostQuery, [decodedTitle]),
            executeQuery<{ title: string }>(getPrevPostQuery, [decodedTitle]),
            executeQuery<{ title: string }>(getNextPostQuery, [decodedTitle]),
        ]);

        if (!posts || posts.length === 0) return notFound();
        const post = posts[0];

        const prevPost = prevPosts?.[0];
        const nextPost = nextPosts?.[0];

        return (
            <>
                <Article post={post} />
                <PrevNextPostLink prevPost={prevPost} nextPost={nextPost} />
            </>
        );
    } catch (error) {
        console.error("Failed to fetch post data:", error);
        return notFound();
    }
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    try {
        const { title } = await params;
        const decodedTitle = decodeUrl(title);
        const posts = await executeQuery<PostType>(getPostQuery, [decodedTitle]);

        if (!posts || posts.length === 0) {
            return {
                title: "記事が見つかりません",
                description: "このページは存在しません",
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

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default PostPage;
