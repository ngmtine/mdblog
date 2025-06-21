import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLoader } from "~/components/articleLoader";
import { decodeUrl } from "~/lib/encodeUrl";
import { executeQuery } from "~/lib/executeQuery";
import type { Post } from "~/lib/types";

const POSTS_PER_PAGE = 10;

interface Props {
    params: Promise<{ name: string }>;
}

const GenrePage = async ({ params }: Props) => {
    const name = decodeUrl((await params).name);

    // 特定ジャンルの記事取得クエリ
    const getInitialPostsByActualGenreNameQuery = `
SELECT
    *
FROM
    mdblog.posts
WHERE
    genre = $1
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "AND published = true" : ""}
ORDER BY
    create_date DESC
LIMIT ${POSTS_PER_PAGE}
;`;

    // 記事取得
    const initialPosts = await executeQuery<Post>(getInitialPostsByActualGenreNameQuery, [name]);

    // 記事無ければ404
    if (!initialPosts || initialPosts.length === 0) notFound();

    // 特定ジャンルの記事総数取得クエリ
    const getPostsCountByActualGenreNameQuery = `
SELECT
    COUNT(*)::integer
FROM
    mdblog.posts
WHERE
    genre = $1
${process.env.INCLUDE_UNPUBLISHED !== "true" ? "AND published = true" : ""}
;`;

    const postsCountResult = await executeQuery<{ count: number }>(getPostsCountByActualGenreNameQuery, [name]);
    const totalPostsInGenre = postsCountResult[0]?.count || 0;
    const isLoadable = initialPosts.length === POSTS_PER_PAGE && totalPostsInGenre > POSTS_PER_PAGE;

    return (
        <ArticleLoader //
            initialPosts={initialPosts}
            isLoadable={isLoadable}
            queryParams={{ genre: name }}
        />
    );
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { name } = await params;

    const title = `ジャンル: ${name} の記事一覧`;
    const description = `${name} に関連する記事の一覧です`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const ogpUrl = `${baseUrl}/api/ogp?title=${title}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${baseUrl}/post/${encodeURIComponent(title)}`,
            images: [{ url: ogpUrl, width: 1200, height: 630 }],
            type: "article",
            // publishedTime: new Date().toString(),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogpUrl],
        },
    };
};

export const dynamic = "force-static"; // SSG: ビルド時静的生成
export const revalidate = 60; // ISR: 60秒ごとに再生成

export default GenrePage;
