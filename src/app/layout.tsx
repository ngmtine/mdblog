import "./globals.css";

import Header from "./header";
import Sidebar from "./sidebar";
import PostList from "./PostList";
import Background from "@/util/background";

import { getCurrentScheme } from "@/util/colorScheme";
import { getCurrentSidebarState } from "@/util/hamburger";
import HamburgerButton from "@/util/hamburgerButton";
import GetCurrentWindowSize from "@/util/getCurrentWindowSize";

import ColorSchemeToggleButton from "@/util/colorSchemeToggleButton";
import TwitterIcon from "@/util/twitterIcon";

// metadataについて
// Pages Routerでは、ページのタイトルやmetaタグ情報はnext/headのHeadコンポーネントで設定していました。
// App Routerでは、metadataオブジェクトをexportすることで設定します。page.jsxもしくはlayout.jsxでexportできます。

export const metadata = {
    title: "mdblog",
    description: "Generated by create next app",
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
};

// 各ページに共通する部品は、layout.jsxの名前で、レイアウトとして定義することができます。appフォルダ内の各階層に配置可能です。
// また、appフォルダ直下では、必ずlayout.jsxを配置する必要があり、htmlタグとbodyタグを記述する必要があります。
// Pages Routerにあった_document.jsや_app.jsは廃止され、/appフォルダ直下のlayout.jsxがその代わりになります。

// layoutは、パラメタとして実際のpage.jsxでexportされるコンポーネントを受け取り、layoutの中で展開してあげる必要があります。上記の例ではchildrenがそれです。
// また、ルーティングを動的に行う場合等を除き、layoutは他のパラメタを受け取ることが出来ません。

// app/
// │  layout.jsx
// │  page.jsx
// │
// └─blog/
//     layout.jsx
//     page.jsx
// ここで、/blogにアクセスした場合、実際には以下のようなイメージでコンポーネントが構築されます。

// <app直下のlayout>
//   <blog直下のlayout>
//     <blog直下のpage />
//   </blog直下のlayout>
// </app直下のlayout>
// 前述のとおり、下位階層のlayoutは、上位階層のlayoutにchildrenとして展開されます。

// children: Home
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const colorScheme = await getCurrentScheme();
    const sidebarState = await getCurrentSidebarState();
    return (
        <html lang="jp" className={colorScheme === "dark" ? "dark" : ""}>
            <body className="container mx-auto bg-iceberg-light dark:bg-iceberg-dark text-gray-900 dark:text-gray-300">
                <Header />
                <div className="flex">
                    <GetCurrentWindowSize>
                        <PostList />
                        <ColorSchemeToggleButton />
                        <TwitterIcon />
                        <HamburgerButton />
                    </GetCurrentWindowSize>
                    {/* <div className={sidebarState === "close" ? "hidden" : ""}>
                        <Sidebar>
                            <PostList></PostList>
                        </Sidebar>
                    </div> */}
                    <div className={`fixed bottom-0 flex` + ` ${sidebarState === "open" ? "md:hidden" : ""}`}>
                        <HamburgerButton />
                    </div>
                    <div id="postWrapper" className="h-screen overflow-y-scroll w-full">
                        {children}
                    </div>
                </div>
                <Background />
            </body>
        </html>
    );
}

// Server Componentは、サーバ側では利用できるReactのコンポーネントです。
// しかし、Server Componentではclickやmousemoveのようなブラウザのイベントや、useStateやuseEffectといったReactのフックは利用できません。Server Componentが対応していない機能を使う場合、Client Componentを利用していくことになります。
// Client Componentにするには、.jsxファイルの先頭に"use client"をつけるだけです。他は、基本的には今までのReact Componentと同じです。
