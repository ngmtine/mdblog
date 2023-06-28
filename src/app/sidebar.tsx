import fetchPostList from "@/util/fetchPostList";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-64 p-3 h-screen bg-gray-900 text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <PostList></PostList>
        </div>
    );
};

const PostList = () => {
    const posts = fetchPostList();

    const postItems = posts.map((post) => (
        <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>{post?.title || post?.slug}</Link>
        </li>
    ));

    return (
        <div>
            <ul>{postItems}</ul>
        </div>
    );
};

export default Sidebar;
