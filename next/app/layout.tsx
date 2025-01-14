import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "./components/header";
import { Moyatto } from "./components/moyatto";
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

const RootLayout = ({ children }: Readonly<Props>) => {
    return (
        <html
            lang="ja" //
            suppressHydrationWarning // FIXME: ThemeProvider使用によるエラーの抑制
        >
            <body className="antialiased">
                <ThemeProvider>
                    <Header />
                    {children}
                    <Moyatto />
                    <Moyatto />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
