import prisma from "@/app/util/prisma";

import { Post } from "./Post";

export const MainContents = async () => {
    const posts = await prisma.posts.findMany();
    return (
        <div
            id="MainContents"
            className="pb-40"
        >
            {posts.map((post, index) => (
                <>
                    <Post
                        key={index}
                        title={post.title}
                        date={String(post.create_date) ?? ""}
                        content={post.content}
                    />
                    <div className="my-40" />
                </>
            ))}
        </div>
    );
};
