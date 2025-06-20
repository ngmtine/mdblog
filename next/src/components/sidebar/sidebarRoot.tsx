import { ArticleList } from "./articleList";
import { GenreList } from "./genreList";
import { Sidebar } from "./sidebar";

/**
 * サイドバーのラッパーコンポーネント（コンポジションパターン）
 */
export const SidebarRoot = () => (
    <aside id="sidebarRoot">
        <Sidebar //
            articleList={<ArticleList />}
            genreList={<GenreList />}
        />
    </aside>
);
