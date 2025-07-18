import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { encodeUrl } from "~/lib/encodeUrl";
import { remarkImageTransform } from "~/lib/remarkImageTransform";
import type { Post } from "~/lib/types";
import { Border } from "./border";
import { HatebuShareButton } from "./functionalIcons/hatebuShareButton";
import { LikeButton } from "./functionalIcons/likeButton";
import { TwitterShareButton } from "./functionalIcons/twitterShareButton";
import { CodeBlock } from "./tagConverters/codeBlock";
import { MarkdownLink } from "./tagConverters/markdownLink";

interface Props {
    post: Post;
    isSummary?: boolean;
}

/**
 * 記事本文または要約文 描画コンポーネント
 */
export const Article = ({ post, isSummary }: Props) => {
    const dateInstance = new Date(String(post.create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/post/${encodeUrl(post.title)}`;

    const content = isSummary ? post.summary : post.content;

    return (
        <article //
            id={post.title}
            data-id={post.id}
            className="
                mx-2 my-4 px-2 py-4
                lg:m-6 lg:px-6
                border rounded-lg
                bg-iceberg-light dark:bg-iceberg-dark
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
            "
        >
            {/* タイトル */}
            <div className="ml-2 lg:ml-0">
                <Link //
                    href={`/post/${encodeUrl(post.title)}`}
                    className="text-4xl font-extrabold"
                    aria-label={post.title}
                >
                    {post.title}
                </Link>
            </div>

            {/* ボーダーと日付 */}
            <Border />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 本文または要約文 */}
            <div className="prose">
                <Markdown //
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkImageTransform]}
                    components={{
                        a: MarkdownLink, // リンク別タブで開くため
                        pre: ({ children }) => children, // preタグは何もせず子を返す（react-syntax-highlighterがcodeタグを処理するときにpreタグでラップするため）
                        code: CodeBlock, // シンタックスハイライト
                    }}
                >
                    {content}
                </Markdown>
            </div>

            {isSummary ? (
                // 要約文なら「続きを読む」表示
                <Link //
                    href={`/post/${encodeUrl(post.title)}`}
                    className="flex justify-end font-bold"
                >
                    ... 続きを読む
                </Link>
            ) : (
                // 本文なら共有ボタンとかいいねボタンとかエリア表示
                <div className="flex justify-end">
                    <HatebuShareButton url={url} />
                    <div className="mr-4" />
                    <TwitterShareButton url={url} />
                    <div className="mr-2.5" />
                    <LikeButton postId={post.id} />
                </div>
            )}
        </article>
    );
};
