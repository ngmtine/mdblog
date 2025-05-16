"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "~/app/util/types";
import { Summary } from "./summary";

interface FetchPostsResponse {
    posts: Post[];
    hasMore: boolean;
}

interface ArticleLoaderProps {
    initialPosts: Post[];
    isLoadable: boolean;
}

export const ArticleLoader = (props: ArticleLoaderProps) => {
    const { initialPosts, isLoadable } = props;
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [page, setPage] = useState(1); // 次に読み込むべきページ番号
    const [hasMore, setHasMore] = useState(isLoadable);
    const [initialLoadHandled, setInitialLoadHandled] = useState(false); // 初期ロード処理済みフラグ

    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                // initialLoadHandled が true になってから監視を開始し、かつ hasMore が true の場合のみ
                if (entries[0].isIntersecting && hasMore && initialLoadHandled) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [hasMore, initialLoadHandled],
    );

    const fetchPosts = useCallback(
        async (pageNum: number) => {
            if (!hasMore) return;
            try {
                const response = await fetch(`/api/posts?page=${pageNum}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data: FetchPostsResponse = await response.json();

                setPosts((prevPosts) => {
                    const newPosts = data.posts.filter((newPost) => !prevPosts.some((existingPost) => existingPost.id === newPost.id));
                    return [...prevPosts, ...newPosts];
                });
                setHasMore(data.hasMore);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        },
        [hasMore],
    );

    useEffect(() => {
        // pageが初期ページ(initialPage)より大きい場合、またはinitialLoadHandledがtrueでpageが変わった場合のみフェッチ
        // これにより、初期表示時はサーバーから渡されたデータを使い、クライアントでの初回フェッチは行わない
        if (initialLoadHandled) {
            fetchPosts(page);
        } else {
            // マウント時に初期ロード処理済みフラグを立てる
            // これにより、IntersectionObserverが初期表示直後に誤って発火するのを防ぐ
            setInitialLoadHandled(true);
        }
    }, [page, fetchPosts, initialLoadHandled]);

    if (posts.length === 0 && !hasMore) {
        return <div className="text-center p-4">ナイスな記事が無いす</div>;
    }

    return (
        <>
            {posts.map((post) => (
                <Summary key={post.id} post={post} />
            ))}

            {hasMore && <div ref={loadMoreRef} className="flex justify-center items-center p-4" />}
        </>
    );
};
