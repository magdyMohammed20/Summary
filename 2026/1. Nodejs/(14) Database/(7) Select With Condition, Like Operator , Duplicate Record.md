(1) Select With Condition
--------------------------
==> SELECT * FROM authors WHERE num_of_books >= 4;
==> SELECT * FROM authors WHERE num_of_books >= 4 AND num_of_books < 10;
==> SELECT * FROM authors WHERE num_of_books BETWEEN 5 AND 10;
==> SELECT * FROM authors WHERE num_of_books=4 OR num_of_books=5;


(2) Like Operator
--------------------------
==> SELECT * FROM authors WHERE name LIKE 'A%'; -- This will return all authors whose names start with the letter 'A'.
==> SELECT * FROM authors WHERE name LIKE '%son'; -- This will return all authors whose names end with 'son'.
==> SELECT * FROM authors WHERE name LIKE '%a%'; -- This will return all authors whose names contain the letter 'a' anywhere in the name.

(3) Duplicate Records
--------------------------
==> INSERT INTO authors (name, num_of_books) SELECT name, num_of_books FROM authors WHERE id = 5; -- This will create a duplicate record of the author with id 5.

