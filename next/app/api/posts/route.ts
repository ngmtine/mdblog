import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { executeQuery } from "~/app/util/executeQuery";
import type { Post } from "~/app/util/types";

const postsPerPage = 10;

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    let page = Number.parseInt(searchParams.get("page") || "1", 10);
    if (Number.isNaN(page) || page < 1) {
        page = 1;
    }
    const offset = (page - 1) * postsPerPage;

    const queryStr = `
SELECT
    id, title, summary, content, create_date, published
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
ORDER BY
    create_date DESC
LIMIT $1
OFFSET $2
;`;

    const posts = await executeQuery<Post>(queryStr, [postsPerPage, offset]);
    const hasMoreQueryStr = `
SELECT
    COUNT(*) as total_count
FROM
    mdblog.posts
${process.env.NODE_ENV === "production" ? "WHERE published = true" : ""}
;`;
    const totalResult = await executeQuery<{ total_count: string }>(hasMoreQueryStr);
    const totalPosts = Number.parseInt(totalResult[0]?.total_count || "0", 10);
    const hasMore = page * postsPerPage < totalPosts;

    return NextResponse.json({ posts, hasMore });
};
