import fetchPostList from "@/util/fetchPostList";

import PostPage from "./post/[slug]/page";

const posts = fetchPostList().slice(0, 5).reverse();

const RootPage = posts.map((post) => {
    return (
        <div key={post.slug}>
            <PostPage params={{ ...post }} />
        </div>
    );
});

export default function Home() {
    return <div className="p-5 pt-20">{RootPage}</div>;
}

// pages.jsxが実際に表示されるページです。従来のPages Routerではpagesフォルダ内の.jsxファイルは全てページとして解釈されましたが、App Routerではpage.jsxのみがページとして解釈されます。
// 記述内容は従来とほとんど変わりません。ページとして表示するコンポーネントをdefault exportすればOKです。
