// 投稿データの型定義
export interface Post {
    id: number;
    title: string;
    genre: string | null;
    create_date: string;
    update_date: string;
    published: boolean;
    filetype: string;
    content: string;
}
