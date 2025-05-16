insert into mdblog.posts
    (title, genre, filetype, content, summary, create_date, update_date, published)
values (
    'test-title',
    'test-genre',
    'md',
    E'あああ！  
ここに画像↓  
![img](/test.jpg)  
うえに画像↑  
',
    'さまりー！',
    NOW(),
    NOW(),
    true
);

-- テスト記事100件生成
INSERT INTO mdblog.posts
    (title, genre, filetype, content, summary, create_date, update_date, published)
SELECT
    'テスト投稿タイトル ' || i AS title,
    CASE (i % 4) -- 4つのジャンルを循環
        WHEN 0 THEN '技術'
        WHEN 1 THEN '趣味'
        WHEN 2 THEN '日記'
        ELSE 'その他'
    END AS genre,
    'md' AS filetype,
    'これはテスト投稿 ' || i || ' の本文です。 Markdown形式で記述されています。\n\n## 見出し2\n\n* リスト項目1\n* リスト項目2\n\n本文が続きます。Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' AS content,
    'テスト投稿 ' || i || ' の簡単な概要です。' AS summary,
    NOW() - (i || ' days')::INTERVAL AS create_date, -- 現在の日時からi日前の日付を設定
    NOW() - (i || ' days')::INTERVAL AS update_date,
    true
FROM generate_series(1, 100) AS i -- 1から100までの連番を生成
;

