import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HidingTitle } from "./components/hidingTitle";
import { Moyatto } from "./components/moyatto";
import { SidebarRoot } from "./components/sidebar/sidebarRoot";
import { ThemeProvider } from "./themeProvider";
import "./globals.css";
import "./scrollbar.css";

const author = "ngmtine";
const siteName = "ngmtine.com";
const description = "お料理ブログです";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: siteName,
    description: description,
    openGraph: {
        title: siteName,
        description,
        url: "https://www.ngmtine.com",
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
            suppressHydrationWarning // FIXME: ThemeProvider使用によるエラーの抑制
            className="overflow-y-hidden"
        >
            <body className="h-screen min-h-screen overflow-x-hidden bg-iceberg-light text-gray-900 opacity-90 dark:bg-iceberg-dark dark:text-gray-300 antialiased">
                <ThemeProvider>
                    <HidingTitle />
                    <SidebarRoot />
                    <main className="mx-auto max-w-screen-3xl mb-20 lg:ml-80 4xl:ml-auto">{children}</main>
                </ThemeProvider>
                <Moyatto />
            </body>
        </html>
    );
};

export default Layout;
