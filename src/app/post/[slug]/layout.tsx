import React from "react";

const PostLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-5 pt-20">{children}</div>;
};

export default PostLayout;
