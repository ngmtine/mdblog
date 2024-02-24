import prisma from "@/app/util/prisma";

export const MainContents = async () => {
    const posts = await prisma.posts.findMany();
    return <div>{posts.map((i) => i.title)}</div>;
};
