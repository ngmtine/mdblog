import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { remarkImageTransform } from "~/app/util/remarkImageTransform";
import type { Post } from "~/app/util/types";
import { TwitterShareButton } from "./TwitterShareButton";
import { HatebuShareButton } from "./hatebuShareButton";

interface Props {
    post: Post;
}

// 記事全文
export const Article = ({ post }: Props) => {
    const dateInstance = new Date(String(post.create_date));
    const dateStr = dateInstance?.toISOString().slice(0, 10) ?? "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/post/${encodeURIComponent(post.title)}`;

    return (
        <article //
            id={post.title}
            className="m-4 py-4 px-6 border border-gray-900 dark:border-gray-300 rounded-lg"
            data-id={post.id}
        >
            {/* タイトル */}
            <Link //
                href={`/post/${encodeURIComponent(post.title)}`}
                className="text-4xl font-extrabold"
                aria-label={post.title}
            >
                {post.title}
            </Link>
            <div className="border-b border-gray-900 dark:border-gray-300" />
            <div className="mt-[-3px] text-right">{dateStr}</div>

            {/* 本文 */}
            <Markdown //
                className="prose text-gray-900 dark:prose-invert dark:text-gray-300"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkImageTransform]}
            >
                {post.content}
            </Markdown>

            {/* 共有ボタンエリア */}
            <div className="flex justify-end">
                <HatebuShareButton url={url} />
                <div className="mr-2" />
                <TwitterShareButton url={url} text={post.title} />
            </div>
        </article>
    );
};
