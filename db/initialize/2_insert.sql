insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'testtitle!！',
    'test-genre',
    'md',
    E'あああ！  
ここに画像↓  
![img](/test.jpg)  
うえに画像↑  
',
    'さまりー！',
    true
);

--------------------------------------------------

insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'coding post',
    'test-genre',
    'md',

    E'フィボナッチ
```python
def Fib(n):
    a, b = 0, 1
    if n == 1:
        return a
    elif n == 2:
        return b
    else:
        for i in range(n-2):
        a, b = b, a + b
        return b
```',

    'コードブロックの確認用記事',
    true
);

--------------------------------------------------

insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'spaced title test',
    'test-genre',
    'md',
    E'スペース入りタイトルの確認',
    'スペース入りタイトルの確認',
    true
);

--------------------------------------------------

insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'hyphened-title-test',
    'test-genre',
    'md',
    E'ハイフン入りタイトルの確認',
    'ハイフン入りタイトルの確認',
    true
);

--------------------------------------------------

insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'underscored-title-test',
    'test-genre',
    'md',
    E'アンダースコア入りタイトルの確認',
    'アンダースコア入りタイトルの確認',
    true
);

--------------------------------------------------

insert into mdblog.posts
    (title, genre, filetype, content, summary, published)
values (
    'あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    'test-genre',
    'md',
    E'クソ長タイトル確認用',
    'クソ長タイトル確認用',
    true
);

--------------------------------------------------

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

    E'これはテスト投稿 ' || i || ' の本文です。 Markdown形式で記述されています。  
## 見出し2  
* リスト項目1  
* リスト項目2  
本文が続きます。  

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  '
    AS content,

    'テスト投稿 ' || i || ' の簡単な概要です。' AS summary,
    NOW() - (i || ' days')::INTERVAL AS create_date, -- 現在の日時からi日前の日付を設定
    NOW() - (i || ' days')::INTERVAL AS update_date,
    true
FROM generate_series(1, 100) AS i -- 1から100までの連番を生成
;

