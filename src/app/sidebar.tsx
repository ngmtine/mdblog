import fs from "fs";
// const fsPromises = fs.promises;
import path from "path";

const Sidebar = ({ posts }) => {
    return (
        <div className="w-64 p-3 h-screen bg-gray-900 text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <PostList></PostList>
        </div>
    );
};

const PostList = async () => {
    const postsDirectory = path.join(process.cwd(), "posts");
    const fileNames = fs.readdirSync(postsDirectory);
    // const fileNames = await fsPromises.readdir(postsDirectory); // 非同期版

    const container: HTMLDivElement[] = [];
    fileNames.forEach((fileName) => {
        const elm = <div key={fileName}>{fileName}</div>;
        container.push(elm);
    });

    return <div>{container}</div>;
};

export default Sidebar;
