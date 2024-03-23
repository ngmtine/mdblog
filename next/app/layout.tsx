import React from "react";

import { Sidebar } from "@/app/_component/Sidebar";

import Background from "./_component/background";
import { Header } from "./_component/Header";
import { ToggleSidebarButton } from "./_component/ToggleSidebarButton";
import { ThemeProvider } from "./ThemeProvider";

import "./globals.css";

type Props = {
    children: React.ReactNode;
};

const RootLayout = async ({ children }: Props) => {
    return (
        <html
            lang="jp"
            suppressHydrationWarning
            className="overflow-y-hidden"
        >
            <body className="h-screen min-h-screen overflow-x-hidden bg-iceberg-light text-gray-900 opacity-90 dark:bg-iceberg-dark dark:text-gray-300">
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
