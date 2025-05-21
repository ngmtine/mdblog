import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLoader } from "~/app/components/articleLoader";
import { decodeUrl } from "~/app/util/encodeUrl";
import { executeQuery } from "~/app/util/executeQuery";
import type { Genre, Post } from "~/app/util/types";

const POSTS_PER_PAGE = 10;

// URLからデコードしたジャンル名に一致する、DBに実際に存在するジャンル名を取得するクエリ
const getActualGenreNameQuery = `
SELECT
    DISTINCT genre AS name
FROM
    mdblog.posts
WHERE
    lower(genre) = lower($1)
    AND genre IS NOT NULL
    AND genre <> ''
LIMIT 1
;`;

interface Props {
    params: Promise<{ name: string }>;
}

const GenrePage = async ({ params }: Props) => {
    const { name } = await params;
    const decodedSearchName = decodeUrl(name, false);

    // URLのデコード名から、DB上の正式なジャンル名取得
    const genreResult = await executeQuery<Genre>(getActualGenreNameQuery, [decodedSearchName]);
    const actualGenre = genreResult[0];

    // ジャンルがDBに存在しない場合は404
    if (!actualGenre) notFound();

    // 特定ジャンルの記事取得クエリ
    const getInitialPostsByActualGenreNameQuery = `
SELECT
    *
FROM
    mdblog.posts
WHERE
    genre = $1
${process.env.NODE_ENV === "production" ? "AND published = true" : ""}
ORDER BY
    create_date DESC
LIMIT ${POSTS_PER_PAGE}
;`;

    // 記事取得
    const initialPosts = await executeQuery<Post>(getInitialPostsByActualGenreNameQuery, [actualGenre.name]);

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
${process.env.NODE_ENV === "production" ? "AND published = true" : ""}
;`;

    const postsCountResult = await executeQuery<{ count: number }>(getPostsCountByActualGenreNameQuery, [actualGenre.name]);
    const totalPostsInGenre = postsCountResult[0]?.count || 0;
    const isLoadable = initialPosts.length === POSTS_PER_PAGE && totalPostsInGenre > POSTS_PER_PAGE;

    return (
        <ArticleLoader //
            initialPosts={initialPosts}
            isLoadable={isLoadable}
            queryParams={{ genre: actualGenre.name }}
        />
    );
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { name } = await params;
    const decodedSearchName = decodeUrl(name);

    // DBから正式なジャンル名を取得 (URLパラメータから推測されるジャンル名で検索)
    const genreResult = await executeQuery<Genre>(getActualGenreNameQuery, [decodedSearchName]);
    const actualGenre = genreResult[0];

    if (!actualGenre) {
        return {
            title: "ジャンルが見つかりません",
            description: "このページは存在しません",
        };
    }

    const title = `ジャンル: ${actualGenre.name} の記事一覧`;
    const description = `${actualGenre.name} に関連する記事の一覧です`;
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
