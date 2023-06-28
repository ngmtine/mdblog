// import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-800 text-gray-300 w-screen p-3">
            {/* これは[slug]以下のlayout.tsxです */}
            {children}
        </div>
    );
}
