import React from "react";

import { Metadata } from "next";

import { Sidebar } from "@/app/component/Sidebar";

import { Header } from "./component/Header";
import { ToggleSidebarButton } from "./component/ToggleSidebarButton";
import { ThemeProvider } from "./ThemeProvider";
import Background from "./util/background";

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
                    <Header />
                    <Sidebar />
                    <ToggleSidebarButton />
                    <div className="container mx-auto px-5 pt-16 lg:pl-80">{children}</div>
                    <Background />
                    <Background />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
