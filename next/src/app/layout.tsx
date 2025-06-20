import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Moyatto } from "~/components/moyatto";
import { SidebarRoot } from "~/components/sidebar/sidebarRoot";
import { ThemeProvider } from "~/components/themeProvider";
import "./globals.css";
import "./scrollbar.css";
import { Title } from "~/components/title";

const author = process.env.NEXT_PUBLIC_AUTHOR;
if (!author) throw new Error("author is undefined");

const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
if (!siteName) throw new Error("siteName is undefined");

const description = process.env.NEXT_PUBLIC_DESCRIPTION;
if (!description) throw new Error("description is undefined");

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("baseUrl is undefined");

const url = process.env.NEXT_PUBLIC_BASE_URL;
if (!url) throw new Error("url is undefined");

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: siteName,
    description: description,
    openGraph: {
        title: siteName,
        description,
        url,
        siteName,
        locale: "ja_JP",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteName,
        description,
        site: author,
        creator: author,
    },
};

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Readonly<Props>) => {
    return (
        <html //
            lang="ja"
            suppressHydrationWarning // ThemeProvider使用によるエラーの抑制
            className="overflow-y-hidden"
        >
            <body className="h-screen min-h-screen overflow-x-hidden antialiased">
                <ThemeProvider>
                    {/* タイトルコンポーネントはスマホで表示、pcで非表示（pcはサイドバー常に表示されるため） */}
                    <div className="visible lg:hidden pl-4 pt-4 mb-[20px]">
                        <Title />
                    </div>
                    <SidebarRoot />
                    <main className="mx-auto max-w-(--breakpoint-3xl) mb-20 lg:ml-80 4xl:ml-auto">{children}</main>
                </ThemeProvider>
                <Moyatto />
            </body>
        </html>
    );
};

export default Layout;
