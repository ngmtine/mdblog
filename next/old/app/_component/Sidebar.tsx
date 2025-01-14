import { ArticleList } from "./ArticleList";
import { SidebarContents } from "./SidebarContents";

// サイドバーのラッパー（コンポジションパターン）
export const Sidebar = () => {
    return (
        <SidebarContents>
            <ArticleList />
        </SidebarContents>
    );
};
