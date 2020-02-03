FROM mysql:5.6

ENV MYSQL_ROOT_PASSWORD 123123  

ADD setup.sql /docker-entrypoint-initdb.d
EXPOSE 3306