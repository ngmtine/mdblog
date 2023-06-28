import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const BlogPost: React.FC = ({ params }) => {
    const { slug } = params;

    // ファイル読み込み
    const filePath = path.join(process.cwd(), `/md/${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // メタデータと本文取得
    const { data, content } = matter(fileContents);

    return (
        <div>
            <h1 className="text-xl">{data.title}</h1>
            <ReactMarkdown className="prose prose-invert">{content}</ReactMarkdown>
        </div>
    );
};

export default BlogPost;
