// import prisma from "@/app/util/prisma";
import { range } from "@/app/util/range";

export const MainContents = async () => {
    // const posts = await prisma.posts.findMany();
    // return <div>{posts.map((i) => i.title)}</div>;
    const content = () => {
        let out = [];
        for (const i of range(100)) {
            out.push(<div>test content!！{i}</div>);
        }
        return out;
    };

    return <div className="bg-emerald-100">{content()}</div>;
};
