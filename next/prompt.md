typescriptでブログサイトを作成します
フレームワークはnext.js app routerです
スタイリングにはtailwindを使用します
記事自体はmarkdownで記述し、それをpostgresqlで管理します
本番環境のホスト先はvercelです
DBのホスト先はsupabaseです
試験環境はローカルのnodeとローカルのDBコンテナです

typescriptの実装に関しては、以下のコード規約を守ってください
es2015移行のモダンな文法を積極的に使用する
変数宣言にvarを使用しない
letよりもconstを優先的に使用する
関数定義にはアロー関数を使用する
非同期処理は生のPromiseを扱うのではなく、なるべくasync/awaitを使用する
forEachよりもfor ofを優先的に使用する
複数の条件分岐がある場合、早期リターンを活用する

また、以下のようなソフトウェア開発の原則に則って実装してください
KISS原則
YAGNI原則
DRY原則

next.js app router特有の事情として、各コンポーネントはserver componentとclient componentに大別されます
client componentからserver componentをインポートすることは出来ないため、
もしネストさせたい場合はcomposition patternを活用してください

現在の実装は以下の通りです

tree app/ | yank
ls -1 ./biome.json ./next.config.ts ./next-env.d.ts ./package.json ./postcss.config.mjs ./tailwind.config.ts ./tsconfig.json | sort | xargs -I _ fish -c "nya _" | yank
find app/ -type f -not -name "*.ico" | sort | xargs -I _ fish -c "nya _" | yank

