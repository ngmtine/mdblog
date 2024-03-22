import React from "react";

import { posts } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
    post: posts; // postsテーブルの型
};

// 記事オブジェクトを受け取りコンポーネントとしてレンダリングする
export const Post = async ({ post }: Props) => {
    const { title, create_date, content } = post;

    const dateInstance = new Date(String(create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    return (
        <article id={title}>
            {/* タイトル部 */}
            <Link
                href={`/post/${title}`}
                className="text-4xl font-extrabold text-gray-900 dark:text-gray-300 "
            >
                {title}
            </Link>
            <hr className="h-[2px] bg-gray-900 dark:h-[1px] dark:bg-gray-300" />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 本文 */}
            <ReactMarkdown
                className="light:text-gray-900 prose text-gray-900 dark:prose-invert dark:text-gray-300"
                rehypePlugins={[rehypeRaw]}
            >
                {content}
            </ReactMarkdown>

            {/* 下部余白 */}
            <div className="pb-40" />
        </article>
    );
};
