import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { executeQuery } from "~/lib/executeQuery";

// 特定の投稿のいいね数を取得
export const GET = async (request: NextRequest, _context: { params: Promise<{}> }) => {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("postId");

        if (!postId || Number.isNaN(Number(postId))) {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }

        // いいね数カウントクエリ
        const query = `
select
    count(*) as "like_count"
from
    mdblog.likes
where
    post_id = $1
;`;
        const params = [Number(postId)];

        // 取得
        const result = await executeQuery<{ like_count: number }>(query, params);
        const likeCount = result[0]?.like_count ?? 0;

        // 返却
        return NextResponse.json({ likeCount });
    } catch (error) {
        console.error("Error fetching like count:", error);
        return NextResponse.json({ error: "Failed to fetch like count" }, { status: 400 });
    }
};

// いいね付与＆いいね数取得
export const POST = async (request: NextRequest, _context: { params: Promise<{}> }) => {
    try {
        const forwardedFor = request.headers.get("x-forwarded-for");
        const userIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
        const userAgent = request.headers.get("user-agent") ?? "unknown";

        const body = await request.json();
        const { postId } = body;

        if (!postId || typeof postId !== "number") {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }

        // いいね実行
        const addLikeQuery = `
insert into
    mdblog.likes (post_id, user_ip, user_agent)
values
    ($1, $2, $3)
;`;
        const addLikeParams = [postId, userIp, userAgent];
        await executeQuery(addLikeQuery, addLikeParams);

        // いいねカウント
        const countLikeQuery = `
select
    count(*) as "like_count"
from
    mdblog.likes
where
    post_id = $1
;`;
        const countLikeParams = [postId];
        const result = await executeQuery<{ like_count: number }>(countLikeQuery, countLikeParams);
        const likeCount = result[0]?.like_count;

        // 返却
        return NextResponse.json({ message: "Like recorded", likeCount });
    } catch (error) {
        console.error("Error recording like:", error);
        return NextResponse.json({ error: "Failed to record like" }, { status: 400 });
    }
};

/*

# GETの実行例
curl -X GET http://localhost:3000/api/likes\?postId=1 \
    --noproxy localhost

# POSTの実行例
curl -X POST http://localhost:3000/api/likes \
    -H "Content-Type: application/json" \
    -d '{"postId": 1}' \
    --noproxy localhost

*/
