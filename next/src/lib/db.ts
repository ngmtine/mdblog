import type { Sql } from "postgres";
import postgres from "postgres";

// グローバル空間に型追加
declare global {
    var db: Sql | undefined;
}

// connectionString取得、環境変数に無ければエラー
const connectionString = process.env.CONNECTION_STRING;
if (!connectionString) throw new Error("connectionString is undefined");

// dbインスタンスをキャッシュから取得または作成
// biome-ignore lint: suspicious/noRedeclare
const db = globalThis.db ?? postgres(connectionString);

// 開発環境の場合、作成したインスタンスをキャッシュ
if (process.env.NODE_ENV !== "production") {
    globalThis.db = db;
}

// シングルトン返却
export { db };
