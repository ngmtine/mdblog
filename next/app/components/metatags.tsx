import Head from "next/head";
import type { ReactNode } from "react";

interface Props {
    title: string;
    description: string;
    url: string;
    // image: string;
    children: ReactNode;
}

// OGP用のメタタグ埋めるだけのコンポーネント
export const MetaTags = (props: Props) => {
    // const { title, description, url, image, children } = props;
    const { title, description, url, children } = props;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                {/* <meta property="og:image" content={image} /> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {/* <meta name="twitter:image" content={image} /> */}
            </Head>
            {children}
        </>
    );
};
