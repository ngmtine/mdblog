import { notFound } from "next/navigation";

import { Post } from "@/app/component/Post";
import prisma from "@/app/util/prisma";

type Props = {
    params: {
        slug: string;
    };
};

const PostPage = async ({ params }: Props) => {
    const { slug } = params;
    const decodedSlug = decodeURIComponent(slug);

    const post = await prisma.posts.findFirst({
        where: {
            title: decodedSlug,
        },
    });

    if (!post) return notFound();

    return <Post post={post} />;
};

export default PostPage;
