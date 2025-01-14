import { ArticleList } from "./articleList";
import { Sidebar } from "./sidebar";

// サイドバーのラッパー（コンポジションパターン）
export const SidebarRoot = () => (
    <div id="sidebarRoot">
        <Sidebar>
            <ArticleList />
        </Sidebar>
    </div>
);
