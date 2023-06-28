export default function Home() {
    return (
        <main>
            <div>hello! it's main div!</div>
        </main>
    );
}

// pages.jsxが実際に表示されるページです。従来のPages Routerではpagesフォルダ内の.jsxファイルは全てページとして解釈されましたが、App Routerではpage.jsxのみがページとして解釈されます。
// 記述内容は従来とほとんど変わりません。ページとして表示するコンポーネントをdefault exportすればOKです。
