import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { encodeUrl } from "~/lib/encodeUrl";
import { remarkImageTransform } from "~/lib/remarkImageTransform";
import type { Post } from "~/lib/types";
import { Border } from "./border";

interface Props {
    post: Post;
}

// 記事概要
export const Summary = ({ post }: Props) => {
    const { title, create_date, summary, content } = post;

    const dateInstance = new Date(String(create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    return (
        <article //
            id={title}
            className="
                mx-2 mt-2 px-2 py-4
                lg:m-6 lg:px-6
                border rounded-lg
                bg-iceberg-light dark:bg-iceberg-dark
                shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            data-id={post.id}
        >
            {/* タイトル */}
            <div className="ml-2 lg:ml-0">
                <Link //
                    href={`/post/${encodeUrl(title)}`}
                    className="text-4xl font-extrabold"
                    aria-label={title}
                >
                    {title}
                </Link>
            </div>
            <Border />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 概要文 */}
            <div className="prose">
                <Markdown //
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkImageTransform]}
                >
                    {summary ? summary : content}
                </Markdown>
            </div>

            {/* 続きを読む */}
            {post.summary && (
                <Link //
                    href={`/post/${encodeUrl(title)}`}
                    className="inline-block font-bold hover:underline"
                >
                    ... 続きを読む
                </Link>
            )}
        </article>
    );
};
