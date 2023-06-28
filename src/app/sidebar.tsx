import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

interface Post {
    fileName: string;
    slug: string;
    title?: string;
    date?: Date;
    description?: string;
}

const Sidebar = () => {
    return (
        <div className="w-64 p-3 h-screen bg-gray-900 text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <PostList></PostList>
        </div>
    );
};

const PostList = () => {
    const postsDirectory = path.join(process.cwd(), "md");
    const fileNames = fs.readdirSync(postsDirectory);

    // posts初期化
    const posts: Post[] = [];
    fileNames.forEach((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");

        // メタデータ取得
        const slug = fileName.replace(".md", "");
        const { data } = matter(fileContents);

        // postsに追加
        posts.push({ fileName, slug, ...data });
    });

    // 日付でソート
    posts.sort((x, y) => x?.date - y?.date);

    const postItems = posts.map((post) => (
        <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post?.title || post?.slug}</Link>
        </li>
    ));

    return (
        <div>
            <ul>{postItems}</ul>
        </div>
    );
};

export default Sidebar;
