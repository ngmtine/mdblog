"use client";

import { useEffect, useState } from "react";
import { fetcher } from "../util/fetcher";
import { Heart } from "./heart";

interface Props {
    postId: number;
}

// いいねボタン
export const LikeButton = ({ postId }: Props) => {
    const [likeCount, setLikeCount] = useState<number | undefined>();

    // 初期いいね数取得
    useEffect(() => {
        const getLikeCount = async () => {
            try {
                const data = await fetcher<{ likeCount: number }>(`/api/likes?postId=${postId}`);
                setLikeCount(data.likeCount);
            } catch (error) {
                console.error("Error getting likeCount:", error);
            }
        };
        getLikeCount();
    }, [postId]);

    // いいねボタン押下イベント
    const handleLike = async () => {
        try {
            const data = await fetcher<{ likeCount: number }>("/api/likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId }),
            });
            setLikeCount(data.likeCount);
        } catch (error) {
            console.error("Error submitting like:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLike}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-75 disabled:cursor-not-allowed"
            aria-label="いいね！"
        >
            <Heart className="h-5 w-5" />
            <span>{likeCount}</span>
        </button>
    );
};

/*
画面初期表示時のいいね数取得にラグがある
propsとして初期いいねをサーバーコンポーネントであるArticleから貰えば回避出来ると思うけど一旦シンプルさ優先
*/
