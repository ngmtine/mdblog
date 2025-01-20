import postgres from "postgres";

export const db = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

/*

FIXME:
supabaseの接続情報を渡す際、以下のように文字列渡すのが楽
postgres(process.env.CONNECTION_STRING)

が、以下のエラーが発生する
[Error: SASL_SIGNATURE_MISMATCH: The server did not return the correct signature] {
  code: 'SASL_SIGNATURE_MISMATCH'
}

おそらくだが、passwordの文字列が正しく渡っていない
そのうち調べる

*/
