import fs from "fs";
// const fsPromises = fs.promises;
import path from "path";
import matter from "gray-matter";

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
    const fileNameList = fs.readdirSync(postsDirectory);
    // const fileNameList = await fsPromises.readdir(postsDirectory); // 非同期版

    const container: HTMLDivElement[] = [];

    const fileDataList = [];
    fileNameList.forEach((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        fileDataList.push({ fileName: fileName, ...data });
    });
    fileDataList.sort((x, y) => x?.date - y?.date);

    fileDataList.forEach((fileData) => {
        const elm = <div>{fileData?.fileName}</div>;
        container.push(elm);
    });

    return <div>{container}</div>;
};

export default Sidebar;
