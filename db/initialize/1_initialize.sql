-- テーブル削除
DROP SCHEMA IF EXISTS mdblog CASCADE;
CREATE SCHEMA mdblog;

-- テーブル作成
CREATE TABLE mdblog.posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    create_date DATE,
    update_date DATE,
    published BOOLEAN NOT NULL,
    filetype VARCHAR(20) CHECK (filetype IN ('md', 'html', 'text')),
    content TEXT NOT NULL,
    summary TEXT
);

CREATE OR REPLACE FUNCTION set_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- 新規レコードの挿入時にcreate_dateを設定
    IF TG_OP = 'INSERT' THEN
        NEW.create_date := CURRENT_DATE;
        NEW.update_date := CURRENT_DATE;
    -- レコードの更新時にupdate_dateを更新
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.update_date := CURRENT_DATE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 挿入時のトリガー
CREATE TRIGGER set_create_date
BEFORE INSERT ON mdblog.posts
    FOR EACH ROW
EXECUTE FUNCTION set_dates();

-- 更新時のトリガー
CREATE TRIGGER set_update_date
BEFORE UPDATE ON mdblog.posts
FOR EACH ROW
EXECUTE FUNCTION set_dates();

