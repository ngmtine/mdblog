import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { executeQuery } from "~/app/util/executeQuery";
import type { Post } from "~/app/util/types";

const postsPerPage = 10;

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const genreName = searchParams.get("genre");
    let page = Number.parseInt(searchParams.get("page") || "1", 10);
    if (Number.isNaN(page) || page < 1) {
        page = 1;
    }

    // 条件に合致した投稿を取得
    const posts = await (async () => {
        let getPostsQuery = `
SELECT
    id, title, summary, content, create_date, published
FROM
    mdblog.posts`;

        const offset = (page - 1) * postsPerPage;
        const conditions: string[] = [];
        const queryParams: (string | number)[] = [postsPerPage, offset];

        if (process.env.NODE_ENV === "production") {
            conditions.push("published = true");
        }

        if (genreName) {
            conditions.push("genre = $3");
            queryParams.push(genreName);
        }

        if (conditions.length) {
            getPostsQuery += `\nWHERE ${conditions.join("\nAND ")}`;
        }

        getPostsQuery += `
ORDER BY
    create_date DESC
LIMIT
    $1
OFFSET
    $2
;`;

        return executeQuery<Post>(getPostsQuery, queryParams);
    })();

    // まだ読み込む事ができるか否かの真偽値
    const hasMore = await (async () => {
        let getTotalCountQuery = `
SELECT
    COUNT(*) as total_count
FROM
    mdblog.posts`;

        const conditions: string[] = [];
        const queryParams: (string | number)[] = [];

        if (process.env.NODE_ENV === "production") {
            conditions.push("published = true");
        }

        if (genreName) {
            conditions.push("genre = $1");
            queryParams.push(genreName);
        }

        if (conditions.length) {
            getTotalCountQuery += `\nWHERE ${conditions.join("\nAND ")}`;
        }

        getTotalCountQuery += ";";

        const totalResult = await executeQuery<{ total_count: string }>(getTotalCountQuery, queryParams);
        const totalPosts = Number.parseInt(totalResult[0]?.total_count || "0", 10);

        return page * postsPerPage < totalPosts;
    })();

    // json返却して終了
    return NextResponse.json({ posts, hasMore });
};
