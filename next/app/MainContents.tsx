// import prisma from "@/app/util/prisma";
import { range } from "@/app/util/range";

export const MainContents = async () => {
    // const posts = await prisma.posts.findMany();
    // return <div>{posts.map((i) => i.title)}</div>;
    const content = () => {
        let ret = [];
        for (const i of range(100)) {
            ret.push(<div>test content!！{i}</div>);
        }
        return ret;
    };

    return <div className="bg-emerald-100">{content()}</div>;
};
