CREATE TABLE IF NOT EXISTS users(
id serial primary key,
name varchar(100) not null,
email varchar(100) UNIQUE not null,
created_at TIMESTAMP DEFAULT NOW()
)
 