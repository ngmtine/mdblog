import { Metadata } from "next";

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
