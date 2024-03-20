import prisma from "@/app/util/prisma";

import { Post } from "./Post";

export const MainContents = async () => {
    const posts = await prisma.posts.findMany();
    posts.reverse();

    return (
        <div
            id="MainContents"
            className="pb-40"
        >
            {posts.map((post, index) => (
                <Post
                    key={index}
                    post={post}
                />
            ))}
        </div>
    );
};
