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
import { LoadingImage } from "./tagConverters/loadingImage";
import { MarkdownLink } from "./tagConverters/markdownLink";

interface Props {
    post: Post;
}

// 記事全文
export const Article = ({ post }: Props) => {
    const { id, title, create_date, content } = post;

    const dateInstance = new Date(String(create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/post/${encodeUrl(title)}`;

    return (
        <article //
            id={title}
            className="
                m-4 py-4 px-6 z-10 border rounded-lg
                bg-iceberg-light dark:bg-iceberg-dark
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
            "
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
            <div className="prose">
                <Markdown //
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkImageTransform]}
                    components={{
                        img: LoadingImage, // 画像読み込み中のローディングアニメーションのため
                        a: MarkdownLink, // リンク別タブで開くため
                        pre: ({ children }) => children, // preタグは何もせず子を返す（react-syntax-highlighterがcodeタグを処理するときにpreタグでラップするため）
                        code: CodeBlock, // シンタックスハイライト
                    }}
                >
                    {content}
                </Markdown>
            </div>

            {/* 共有ボタンエリア */}
            <div className="flex justify-end">
                <HatebuShareButton url={url} />
                <div className="mr-4" />
                <TwitterShareButton url={url} />
                <div className="mr-2.5" />
                <LikeButton postId={id} />
            </div>
        </article>
    );
};
