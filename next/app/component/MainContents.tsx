import { unstable_cache } from "next/cache";

import prisma from "@/app/util/prisma";

import { Post } from "./Post";

export const MainContents = async () => {
    // prismaでのデータフェッチをキャッシュ
    const posts = await unstable_cache(async () => {
        return await prisma.posts.findMany();
    })();

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
