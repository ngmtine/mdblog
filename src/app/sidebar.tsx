import fs from "fs";
// const fsPromises = fs.promises;
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-64 p-3 h-screen bg-gray-900 text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <PostList></PostList>
        </div>
    );
};

const PostList = async () => {
    const postsDirectory = path.join(process.cwd(), "md");
    const fileNames = fs.readdirSync(postsDirectory);
    // const fileNames = await fsPromises.readdir(postsDirectory); // 非同期版

    const container: HTMLDivElement[] = [];

    // posts初期化
    const posts = [];
    fileNames.forEach((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");

        // メタデータ取得
        const slug = fileName.replace(".md", "");
        // const { metaData } = matter(fileContents);
        const { data } = matter(fileContents);

        // postsに追加
        posts.push({ fileName, slug, ...data });
    });

    // 日付でソート
    posts.sort((x, y) => x?.date - y?.date);

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/posts/${post.slug}`}>{post?.title || post?.slug}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
