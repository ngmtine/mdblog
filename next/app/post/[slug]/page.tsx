import fs from "fs";
import path from "path";

import matter from "gray-matter";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type PostPageProps = {
    params: {
        fileName: string;
        slug: string;
        title?: string;
        date?: Date;
        description?: string;
    };
};

const PostPage = ({ params }: PostPageProps) => {
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
            <Link
                href={`/post/${slug}`}
                className="text-4xl font-extrabold text-gray-900 dark:text-gray-300 "
            >
                {title}
            </Link>
            <hr className="h-[2px] bg-gray-900 dark:h-[1px] dark:bg-gray-300"></hr>
            <div className="mt-[-3px] text-right">{dateStr}</div>
            <ReactMarkdown
                className="prose dark:prose-invert"
                rehypePlugins={[rehypeRaw]}
            >
                {content}
            </ReactMarkdown>
            <div className="my-40"></div>
        </article>
    );
};

export default PostPage;
