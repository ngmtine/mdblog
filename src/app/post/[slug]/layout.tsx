import React from "react";

export default function PostLayout({ children }: { children: React.ReactNode }) {
    return <div className="p-5 pt-20">{children}</div>;
}
