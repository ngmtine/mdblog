// import "./globals.css";

import BlogPost from "./page";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            [slug]以下のlayout.tsxです
            {/* <BlogPost></BlogPost> */}
            {children}
        </div>
    );
}
