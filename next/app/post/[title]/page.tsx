import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import { Post } from "@/app/component/Post";
import prisma from "@/app/util/prisma";

type Props = {
    params: {
        title: string;
    };
};

const PostPage = async ({ params }: Props) => {
    const { title } = params;
    const decodedSlug = decodeURIComponent(title);

    // prismaでのデータフェッチをキャッシュ
    const posts = await unstable_cache(async () => {
        return await prisma.posts.findMany();
    })();

    const post = posts.find((i) => i.title === decodedSlug);

    if (!post) return notFound();

    return <Post post={post} />;
};

export default PostPage;
