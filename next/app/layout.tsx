import React from "react";

import { Metadata } from "next";

import { ThemeProvider } from "./ThemeProvider";
import Background from "./util/background";

import "./globals.css";

// metadataについて
// Pages Routerでは、ページのタイトルやmetaタグ情報はnext/headのHeadコンポーネントで設定していました。
// App Routerでは、metadataオブジェクトをexportすることで設定します。page.jsxもしくはlayout.jsxでexportできます。

const siteName = "mdblog";
const description = "お料理ブログです";
const author = "ngmtine";

export const metadata: Metadata = {
    metadataBase: new URL("http://localhost:3000"),
    title: siteName,
    description: description,
    openGraph: {
        title: siteName,
        description: description,
        url: "https://www.ngmtine.blog",
        siteName: siteName,
        locale: "ja_JP",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteName,
        description: description,
        site: author,
        creator: author,
    },
};

type Props = {
    children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
    return (
        <html
            lang="jp"
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-iceberg-light text-gray-900 opacity-90 dark:bg-iceberg-dark dark:text-gray-300">
                <ThemeProvider>
                    {children}
                    <Background />
                    <Background />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;

/*

各ページに共通する部品は、layout.jsxの名前で、レイアウトとして定義することができます。appフォルダ内の各階層に配置可能です。
また、appフォルダ直下では、必ずlayout.jsxを配置する必要があり、htmlタグとbodyタグを記述する必要があります。
Pages Routerにあった_document.jsや_app.jsは廃止され、/appフォルダ直下のlayout.jsxがその代わりになります。

layoutは、パラメタとして実際のpage.jsxでexportされるコンポーネントを受け取り、layoutの中で展開してあげる必要があります。childrenがそれです。
また、ルーティングを動的に行う場合等を除き、layoutは他のパラメタを受け取ることが出来ません。

app/
│  layout.jsx
│  page.jsx
│
└─blog/
    layout.jsx
    page.jsx
ここで、/blogにアクセスした場合、実際には以下のようなイメージでコンポーネントが構築されます。

<app直下のlayout>
  <blog直下のlayout>
    <blog直下のpage />
  </blog直下のlayout>
</app直下のlayout>
前述のとおり、下位階層のlayoutは、上位階層のlayoutにchildrenとして展開されます。


*/
