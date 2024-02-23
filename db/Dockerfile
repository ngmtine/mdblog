FROM postgres:latest

ENV POSTGRES_USER dockeruser
ENV POSTGRES_PASSWORD dockerpass
ENV POSTGRES_DB main

COPY initialize/* /docker-entrypoint-initdb.d/

EXPOSE 5432

