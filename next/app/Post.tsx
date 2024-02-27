import React from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
    title: string; // タイトル
    date: string; // create_date
    content: string; // 本文
};

// 記事オブジェクトを受け取りコンポーネントとしてレンダリングする
export const Post = async ({ title, date, content }: Props) => {
    const dateInstance = new Date(date);
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    return (
        <article id={title}>
            {/* <Link
                href={`/post/${slug}`}
                className="text-4xl font-extrabold text-gray-900 dark:text-gray-300 "
            >
                {title}
            </Link> */}

            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-300">{title}</h1>
            <hr className="h-[2px] bg-gray-900 dark:h-[1px] dark:bg-gray-300"></hr>
            <div className="mt-[-3px] text-right">{dateStr}</div>
            <ReactMarkdown
                className="prose dark:prose-invert"
                rehypePlugins={[rehypeRaw]}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};
