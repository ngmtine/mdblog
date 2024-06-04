import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import { Post } from "@/app/_component/Post";
import prisma from "@/app/util/prisma";

type Props = {
    params: {
        title: string;
    };
};

const PostPage = async ({ params }: Props) => {
    const { title } = params;
    const decodedTitle = decodeURIComponent(title);

    // prismaでのデータフェッチをキャッシュ
    const posts = await unstable_cache(
        async () => await prisma.posts.findMany(),
        ["posts"],
        { revalidate: 60 }, // 1分毎にキャッシュ更新
    )();
    const post = posts.find((i) => i.title === decodedTitle);

    if (!post) return notFound();

    return <Post post={post} />;
};

export default PostPage;

export const dynamic = "force-static";
