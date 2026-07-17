(1) Find Duplicated Rows
-------------------------
==> SELECT name, COUNT(*)
    FROM authors
    GROUP BY name
    HAVING COUNT(*) > 2; -- Will return authors with more than 2 entries Or Have Same name in the authors table.


==> SELECT num_of_books, name, COUNT(*)
    FROM authors
    GROUP BY name, num_of_books
    HAVING COUNT(*) > 1; -- Will return authors with the same name and number of books in the authors table.