import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

// const Page: React.FC = () => {
const BlogPost = ({ params }) => {
    const { slug } = params;

    // ファイル読み込み
    const filePath = path.join(process.cwd(), `/md/${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // メタデータと本文取得
    const { data, content } = matter(fileContents);

    return (
        <div>
            <h1>{data.title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );

    // return <div>あああ！</div>;
};

export default BlogPost;
