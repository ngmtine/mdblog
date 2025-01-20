# db

```sh
# compose使わない場合
cd db
docker image build ./ -t mdblog-db-image
docker container run --rm -d -p 5433:5432 --name mdblog-db-container mdblog-db-image

# compose使う場合
docker compose up

psql -h localhost -p 5433 -d main -U dockeruser
select * from mdblog.posts;
```

# 記事更新

```sql
insert into mdblog.posts (title, genre, published, filetype, content)
values ('謹賀新年2', 'ポエム', true, 'md', E'賀正2');
```

db更新後にvercel上でredeploy
