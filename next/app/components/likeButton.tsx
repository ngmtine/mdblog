"use client";

import { useState } from "react";
import { Heart } from "./heart";

interface LikeButtonProps {
    postId: number;
    initialLikeCount: number;
}

export const LikeButton = ({ postId, initialLikeCount }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);

    const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await fetch("/api/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to submit like:", errorData.error || "Unknown error");
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            setLikeCount(data.likeCount);
        } catch (error) {
            console.error("Error submitting like:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLike}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-75 disabled:cursor-not-allowed"
            aria-label="いいねする"
        >
            <Heart className="h-5 w-5" />
            <span>{likeCount}</span>
        </button>
    );
};
