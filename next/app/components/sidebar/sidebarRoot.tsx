import { ArticleList } from "./articleList";
import { GenreList } from "./genreList";
import { Sidebar } from "./sidebar";

// サイドバーのラッパー（コンポジションパターン）
export const SidebarRoot = () => (
    <aside id="sidebarRoot">
        <Sidebar //
            articleList={<ArticleList />}
            genreList={<GenreList />}
        />
    </aside>
);
