(1) Order By specific column
------------------------------
==> SELECT *
    FROM authors
    ORDER BY num_of_books; -- Order by ascending order (default)

==> SELECT *
    FROM authors
    ORDER BY num_of_books ASC; -- Order by ascending order (explicit)

==> SELECT *
    FROM authors
    ORDER BY num_of_books DESC; -- Order by descending order


(2) Delete specific rows
------------------------------
==> DELETE FROM authors
    WHERE num_of_books < 5; -- Delete authors with less than 5 books

(3) Delete specific rows and return deleted rows
------------------------------
==> DELETE FROM authors
    WHERE num_of_books < 5
    RETURNING *; -- Delete authors with less than 5 books and return deleted rows

(4) Update specific rows
------------------------------
==> UPDATE authors
    SET num_of_books = num_of_books + 1
    WHERE num_of_books < 5; -- Increment num_of_books by 1 for authors with less than 5 books


==> UPDATE authors
    SET num_of_books = num_of_books + 1
    WHERE num_of_books < 5
    RETURNING *; -- Increment num_of_books by 1 for authors with less than 5 books and return updated rows