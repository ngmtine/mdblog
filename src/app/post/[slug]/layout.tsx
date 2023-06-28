// import "./globals.css";

import BlogPost from "./page";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-800 text-gray-300 w-screen p-5">
            {/* [slug]以下のlayout.tsxです */}
            {children}
        </div>
    );
}
