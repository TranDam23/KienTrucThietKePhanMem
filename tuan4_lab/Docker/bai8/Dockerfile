FROM postgres:15

# Set biến môi trường cho PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456
ENV POSTGRES_DB=mydb

# Copy file SQL vào thư mục auto init
COPY init.sql /docker-entrypoint-initdb.d/