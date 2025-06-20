# mdblog

markdown blog

features:  
write articles in markdown and manage them in db  
OGP support (tested on twitter)

stack:  
next.js v15 + tailwind + postgresql

deployment:  
vercel + supabase

example:  
[myblog](https://www.ngmtine.com/)

# db

```sh
# compose使わない場合
cd db
docker image build ./ -t mdblog-db-image
docker container run --rm -d -p 5433:5432 --name mdblog-db-container mdblog-db-image

# compose使う場合
docker compose up
```

```
psql -h localhost -p 5433 -d main -U dockeruser
# または
psql postgres://dockeruser:dockerpass@localhost:5433/main

select * from mdblog.posts;
```

# 記事更新

```sql
insert into mdblog.posts (title, genre, published, filetype, content)
values ('謹賀新年', 'ポエム', true, 'md', E'賀正');
```

db更新後に1分周期で自動更新される  
もしくはvercel上でredeployするとビルド走って強制更新  

# コンテナ再起動

```sh
docker compose down --volumes && sudo rm -rf db/data/ && docker compose up --build
```

