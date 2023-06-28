import BlogPost from "./post/[slug]/page";
import fetchPostList from "@/util/fetchPostList";

export default function Home() {
    const posts = fetchPostList().slice(0, 5);

    const postItems = posts.map((post) => {
        return (
            <div key={post.slug}>
                <BlogPost params={{ ...post }} />
            </div>
        );
    });

    return (
        <div className="bg-gray-800 text-gray-300 w-screen p-3">
            <div>{postItems}</div>
        </div>
    );
}

// pages.jsxが実際に表示されるページです。従来のPages Routerではpagesフォルダ内の.jsxファイルは全てページとして解釈されましたが、App Routerではpage.jsxのみがページとして解釈されます。
// 記述内容は従来とほとんど変わりません。ページとして表示するコンポーネントをdefault exportすればOKです。
