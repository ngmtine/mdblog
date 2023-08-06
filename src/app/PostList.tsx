import fetchPostList from "@/util/fetchPostList";
import Link from "next/link";

const PostList = (): JSX.Element => {
    // サイドバーに表示する、最新5件のulを含んだdivを返す
    const posts = fetchPostList().reverse();

    const RootPage = posts.map((post) => (
        <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>{post?.title ? `・ ${post.title}` : post?.slug}</Link>
        </li>
    ));

    return (
        <div>
            <ul>{RootPage}</ul>
        </div>
    );
};

export default PostList;
