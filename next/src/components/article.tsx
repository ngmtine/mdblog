import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { remarkImageTransform } from "~/lib/remarkImageTransform";
import type { Post } from "~/lib/types";
import { encodeUrl } from "../lib/encodeUrl";
import { Border } from "./border";
import { HatebuShareButton } from "./hatebuShareButton";
import { LikeButton } from "./likeButton";
import { LoadingImage } from "./loadingImage";
import { MarkdownLink } from "./markdownLink";
import { TwitterShareButton } from "./TwitterShareButton";
import { ThemedPre } from "./themedPre";

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

    return (
        <article //
            id={title}
            className="m-4 py-4 px-6 border rounded-lg"
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
            <div //
                className="prose"
            >
                <Markdown //
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkImageTransform]}
                    components={{
                        img: LoadingImage, // 画像読み込み中のローディングアニメーションのため
                        a: MarkdownLink, // 別タブで開くため
                        pre: ThemedPre, // コードブロック修正
                    }}
                >
                    {content}
                </Markdown>
            </div>

            {/* 共有ボタンエリア */}
            <div className="flex justify-end">
                <HatebuShareButton url={url} />
                <div className="mr-3" />
                <TwitterShareButton url={url} />
                <div className="mr-1.5" />
                <LikeButton postId={id} />
            </div>
        </article>
    );
};
