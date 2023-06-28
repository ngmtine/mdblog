import fetchPostList from "@/util/fetchPostList";
import Link from "next/link";
import HamburgerButton from "@/util/hamburgerButton";

const Sidebar = () => {
    return (
        <div className="w-80 p-5 h-screen bg-gray-900 text-gray-300">
            <div className="pb-5">
                <Link href={"/"} className="text-xl font-semibold mb-5">
                    真・フランス料理紹介ブログ
                </Link>
            </div>
            <PostList></PostList>
            <HamburgerButton></HamburgerButton>
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
