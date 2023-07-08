import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const PostPage: React.FC = ({ params }) => {
    const { slug } = params;

    // ファイル読み込み
    const filePath = path.join(process.cwd(), `/md/${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // メタデータと本文取得
    const { data, content } = matter(fileContents);
    const { title, date } = data;
    const dateStr = date?.toISOString().slice(0, 10) ?? "";

    return (
        <article>
            <h1 className="text-4xl font-extrabold">{title}</h1>
            <hr className="bg-gray-300 dark:bg-gray-900"></hr>
            <div className="text-right mt-[-3px]">{dateStr}</div>
            <ReactMarkdown className="prose dark:prose-invert">{content}</ReactMarkdown>
            <div className="my-40"></div>
        </article>
    );
};

export default PostPage;
