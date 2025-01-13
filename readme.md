# db

```sh
cd db
docker image build ./ -t mdblog-image
docker container run --rm -d -p 5433:5432 --name mdblog-container mdblog-image

psql -h localhost -p 5433 -d main -U dockeruser
select * from mdblog.posts;
```
