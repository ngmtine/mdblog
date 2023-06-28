import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
    fileName: string;
    slug: string;
    title?: string;
    date?: Date;
    description?: string;
}

const fetchPostList = () => {
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

    return posts;
};

export default fetchPostList;
