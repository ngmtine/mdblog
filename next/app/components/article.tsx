import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { remarkImageTransform } from "~/app/util/remarkImageTransform";
import type { Post } from "~/app/util/types";
import { encodeUrl } from "../util/encodeUrl";
import { executeQuery } from "../util/executeQuery";
import { TwitterShareButton } from "./TwitterShareButton";
import { Border } from "./border";
import { HatebuShareButton } from "./hatebuShareButton";
import { LikeButton } from "./likeButton";
import { LoadingImage } from "./loadingImage";
import { MarkdownLink } from "./markdownLink";

interface Props {
    post: Post;
}

// 記事全文
export const Article = async ({ post }: Props) => {
    const { id, title, create_date, content } = post;

    const dateInstance = new Date(String(create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/post/${encodeUrl(title)}`;

    // いいね数取得
    let likeCount = 0;
    try {
        const result = await executeQuery<{ like_count: number }>(`
SELECT COUNT(*) AS "like_count"
FROM mdblog.likes
WHERE post_id = ${id}
`);
        likeCount = Number(result[0]?.like_count) || 0;
    } catch (error) {
        console.error("Failed to fetch initial like count for article:", error);
    }

    return (
        <article //
            id={title}
            className="m-4 py-4 px-6 border border-gray-900 dark:border-gray-300 rounded-lg"
            data-id={id}
        >
            {/* タイトル */}
            <Link //
                href={`/post/${encodeUrl(title)}`}
                className="text-4xl font-extrabold"
                aria-label={title}
            >
                {title}
            </Link>
            <Border />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 本文 */}
            <div className="prose text-gray-900 dark:prose-invert dark:text-gray-300">
                <Markdown //
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkImageTransform]}
                    components={{
                        img: LoadingImage, // 画像読み込み中のローディングアニメーションのため
                        a: MarkdownLink, // 別タブで開くため
                    }}
                >
                    {content}
                </Markdown>
            </div>

            {/* 共有ボタンエリア */}
            <div className="flex justify-end">
                <HatebuShareButton url={url} />
                <div className="mr-2" />
                <TwitterShareButton url={url} />
                <div className="mr-2" />
                <LikeButton postId={id} initialLikeCount={likeCount} />
            </div>
        </article>
    );
};
