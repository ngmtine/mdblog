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
        <button //
            type="button"
            onClick={handleLike}
            aria-label="いいね！"
            className="inline-flex items-center justify-center hover:text-red-500 transition-colors duration-150 ease-in-out group mt-0.5"
        >
            {/* ハートアイコン */}
            <Heart className="w-11 h-11 transition-transform duration-150 ease-in-out group-hover:scale-110 group-active:scale-95" />
            {/* いいね数 */}
            <span className="absolute text-xs font-bold">{likeCount}</span>
        </button>
    );
};

/*
画面初期表示時のいいね数取得にラグがある
propsとして初期いいねをサーバーコンポーネントであるArticleから貰えば回避出来ると思うけど一旦シンプルさ優先
*/
