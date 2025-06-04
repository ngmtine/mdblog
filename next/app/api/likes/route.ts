import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { executeQuery } from "~/app/util/executeQuery";

// 特定の投稿のいいね数を取得
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId || Number.isNaN(Number(postId))) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    try {
        const result = await executeQuery<{ like_count: number }>(
            `
select
    count(*) as "like_count"
from
    mdblog.likes
where
    post_id = $1
;`,
            [Number(postId)],
        );
        const likeCount = result[0]?.like_count || 0;
        return NextResponse.json({ likeCount });
    } catch (error) {
        console.error("Error fetching like count:", error);
        return NextResponse.json({ error: "Failed to fetch like count" }, { status: 500 });
    }
};

// いいねを記録
export const POST = async (request: NextRequest) => {
    // @ts-ignore
    let userIp = request.ip; // Vercel環境などでは自動的に取得される
    const userAgent = request.headers.get("user-agent") || "";

    // ローカル開発環境など、request.ip が取得できない場合のフォールバック
    // より確実なIP取得はミドルウェアやリバースプロキシの設定に依存します
    if (!userIp) {
        const forwardedFor = request.headers.get("x-forwarded-for");
        if (forwardedFor) {
            userIp = forwardedFor.split(",")[0].trim();
        } else {
            userIp = "unknown"; // もしくは null
        }
    }

    try {
        const body = await request.json();
        const { postId } = body;

        if (!postId || typeof postId !== "number") {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }

        // postsテーブルに該当postIdが存在するか確認 (任意だが推奨)
        const postExists = await executeQuery(`SELECT id FROM mdblog.posts WHERE id = ${postId}`);
        if (postExists.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // いいねを記録
        await executeQuery(`
INSERT INTO mdblog.likes (post_id, user_ip, user_agent)
VALUES (${postId}, ${userIp}, ${userAgent})
`);

        // 更新後のいいね総数を取得して返却
        const result = await executeQuery<{ like_count: number }>(`
SELECT COUNT(*) AS "like_count"
FROM mdblog.likes
WHERE post_id = ${postId}
        `);
        const likeCount = result[0]?.like_count || 0;

        return NextResponse.json({ message: "Like recorded", likeCount }, { status: 201 });
    } catch (error) {
        console.error("Error recording like:", error);
        // エラーの種類によってステータスコードを分けることも検討
        return NextResponse.json({ error: "Failed to record like" }, { status: 500 });
    }
};
