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

    return (
        <article>
            <h1 className="text-4xl font-extrabold">{data.title}</h1>
            <hr className="my-2"></hr>
            <ReactMarkdown className="prose prose-invert">{content}</ReactMarkdown>
            <div className="my-40"></div>
        </article>
    );
};

export default PostPage;
