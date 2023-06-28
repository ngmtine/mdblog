import fetchPostList from "@/util/fetchPostList";
import Link from "next/link";

/**
 * @returns {HTMLDivElement} - サイドバーに表示する、最新5件のulを含んだdivを返す
 */
const PostList = () => {
    const posts = fetchPostList();

    const RootPage = posts.map((post) => (
        <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>{post?.title || post?.slug}</Link>
        </li>
    ));

    return (
        <div>
            <ul>{RootPage}</ul>
        </div>
    );
};

export default PostList;
