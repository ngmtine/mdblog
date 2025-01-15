import { ArticleList } from "./articleList";
import { Sidebar } from "./sidebar";

// サイドバーのラッパー（コンポジションパターン）
export const SidebarRoot = () => (
    <aside id="sidebarRoot">
        <Sidebar>
            <ArticleList />
        </Sidebar>
    </aside>
);
