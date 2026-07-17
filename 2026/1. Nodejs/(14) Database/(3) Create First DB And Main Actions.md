(1) Create First DB Through Macos terminal
-------------------------------------------
==> psql -U postgres
==> Then Enter Password of super user (123456)
==> CREATE DATABASE books;

(2) Switch To Specific DATABASE
---------------------------------
==> \c books

(3) DROP DATABASE
-------------------
==> DROP DATABASE books;

(4) List All Databases
------------------------
==> \l

(5) List All Tables from DB
-----------------------------
==> \dt

(6) Create Table with primary key and unique columns
------------------------------------------------------
==> CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        author VARCHAR(255) NOT NULL,
        price DECIMAL(10,2),
        published_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
