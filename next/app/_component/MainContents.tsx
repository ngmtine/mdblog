import { unstable_cache } from "next/cache";
import type { Post as PostType } from "../types";
import { executeQuery } from "../util/executeQuery";

import { Post } from "./Post";

const getPostsQuery = `
SELECT
    id, title, create_date, content
FROM
    mdblog.posts
WHERE
    published = true
ORDER BY
    create_date DESC
LIMIT 5
;`;

export const MainContents = async () => {
    const posts = await unstable_cache(async () => {
        return await executeQuery<PostType>(getPostsQuery);
    })();

    console.log(posts);

    if (posts.length) {
        posts.sort((i, j) => {
            if (!i.create_date) return 1;
            if (!j.create_date) return -1;
            return new Date(j.create_date).getTime() - new Date(i.create_date).getTime();
        });
    }

    return (
        <div id="mainContents" className="pb-40">
            {/* {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))} */}
            hello!!
        </div>
    );
};
