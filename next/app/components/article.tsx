import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import type { Post } from "~/app/util/types";

interface Props {
    post: Post;
}

// 記事全文
export const Article = async ({ post }: Props) => {
    const { title, create_date, content } = post;

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
                className="text-4xl font-extrabold"
                aria-label={title}
            >
                {title}
            </Link>
            <div className="border-b border-gray-900 dark:border-gray-300" />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 本文 */}
            <Markdown //
                className="prose text-gray-900 dark:prose-invert dark:text-gray-300"
                rehypePlugins={[rehypeRaw]}
            >
                {content}
            </Markdown>

            {/* 下部余白 */}
            <div className="pb-40" />
        </article>
    );
};
