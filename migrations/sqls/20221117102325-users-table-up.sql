CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(30) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    password_d varchar
);