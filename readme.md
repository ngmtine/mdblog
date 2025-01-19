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
