import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "./components/header";
import { Moyatto } from "./components/moyatto";
import { SidebarRoot } from "./components/sidebar/sidebarRoot";
import { ThemeProvider } from "./themeProvider";
import "./globals.css";

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

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Readonly<Props>) => {
    return (
        <html
            lang="ja" //
            suppressHydrationWarning // FIXME: ThemeProvider使用によるエラーの抑制
            className="overflow-y-hidden"
        >
            <body className="h-screen min-h-screen overflow-x-hidden bg-iceberg-light text-gray-900 opacity-90 dark:bg-iceberg-dark dark:text-gray-300 antialiased">
                <ThemeProvider>
                    <Header />
                    <SidebarRoot />
                    <div id="upperMargin" className="pt-10" /> {/* 上部余白 */}
                    {/* {children} */}
                    <div className="container mx-auto lg:pl-80">{children}</div>
                    <div id="lowerMargin" className="pb-20" /> {/* 下部余白 */}
                </ThemeProvider>
                <Moyatto />
                <Moyatto />
            </body>
        </html>
    );
};

export default Layout;
