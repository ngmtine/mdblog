import Link from "next/link";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Post } from "~/app/util/types";

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
            className="m-4 py-4 px-6 border border-gray-900 dark:border-gray-300 rounded-lg"
        >
            {/* タイトル */}
            <Link //
                href={`/post/${encodeURIComponent(title)}`}
                className="text-4xl font-extrabold mb-2"
                aria-label={title}
            >
                {title}
            </Link>
            <div className="border-b border-gray-900 dark:border-gray-300" />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 概要文 */}
            <Markdown //
                className="prose text-gray-900 dark:prose-invert dark:text-gray-300"
                rehypePlugins={[rehypeRaw]}
            >
                {summary ? summary : content}
            </Markdown>

            {/* 続きを読む */}
            {post.summary && (
                <Link //
                    href={`/post/${encodeURIComponent(title)}`}
                    className="mt-2 inline-block text-blue-500 hover:underline"
                >
                    続きを読む
                </Link>
            )}
        </article>
    );
};
