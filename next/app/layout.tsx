import React from "react";

import { Sidebar } from "@/app/component/Sidebar";

import { Header } from "./component/Header";
import { ToggleSidebarButton } from "./component/ToggleSidebarButton";
import { ThemeProvider } from "./ThemeProvider";
import Background from "./util/background";

import "./globals.css";

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
