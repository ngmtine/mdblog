import { useEffect, useRef, useState } from "react";

export const DEFAULT_THRESHOLD = 1024; // tailwindのlgに相当

export const useResponsiveSidebar = (threshold: number = DEFAULT_THRESHOLD) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const sidebarRef = useRef<HTMLDivElement>(null);

    // 画面サイズに応じたサイドバーの開閉処理
    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= threshold);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [threshold]);

    // クリックイベント付与（サイドバー外クリックまたはリンククリックで閉じる）
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // 幅が閾値以上の場合はサイドバーを固定表示するため何もしない
            if (window.innerWidth >= threshold) return;

            if (!sidebarRef.current) return;
            const target = event.target as HTMLElement;

            // サイドバー外クリックの場合、サイドバーが開いていれば閉じる
            if (isSidebarOpen && !sidebarRef.current.contains(target)) {
                setIsSidebarOpen(false);
                return;
            }

            // サイドバー内のリンククリックの場合、サイドバーを閉じる
            if (target.tagName === "A" && sidebarRef.current.contains(target)) {
                setIsSidebarOpen(false);
                return;
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [isSidebarOpen, threshold]);

    return { isSidebarOpen, toggleSidebar, sidebarRef };
};
