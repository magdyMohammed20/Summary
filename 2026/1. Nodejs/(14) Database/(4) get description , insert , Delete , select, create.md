(1) get description of table
------------------------------
==> \d TABLE_NAME (ex: \d books) 

(2) delete table
------------------
==> DROP TABLE TABLE_NAME; (ex: DROP TABLE books_store;)

(3) create table with more constraints
----------------------------------------
==> CREATE TABLE IF NOT EXISTS customer(
        id INT PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    );

(4) insert data into table
----------------------------
==> INSERT INTO authors(name, num_of_books) VALUES('magdy', 10), ('mohammed', 2);

(5) Select data from table
----------------------------
==> SELECT * FROM TABLE_NAME; (ex: SELECT * FROM books;)
==> SELECT COLUMN_NAME FROM TABLE_NAME; (ex: SELECT name FROM books;)
==> SELECT COLUMN_NAME,COLUMN_NAME FROM TABLE_NAME; (ex: SELECT name, email FROM customer;)
==> SELECT * FROM TABLE_NAME WHERE CONDITION; (ex: SELECT * FROM books WHERE price > 10;)
