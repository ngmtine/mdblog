import fetchPostList from "@/app/util/fetchPostList";

const Home = () => {
    return <div>メインコンテンツです！</div>;
};

export default Home;

// pages.jsxが実際に表示されるページです。従来のPages Routerではpagesフォルダ内の.jsxファイルは全てページとして解釈されましたが、App Routerではpage.jsxのみがページとして解釈されます。
// 記述内容は従来とほとんど変わりません。ページとして表示するコンポーネントをdefault exportすればOKです。
