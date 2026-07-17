(1) Delete All Rows And Can Undo it
-------------------------------------
==> DELETE FROM TABLE_NAME; (ex: DELETE FROM customers;)

(2) Undo Deleted Rows If Deleted (terminal)
------------------------------------

    BEGIN;
    DELETE FROM books;
    SELECT * FROM books;
    ROLLBACK; 
    COMMIT;   

(3) Delete All Rows And Cannot Undo it
---------------------------------------
==> TRUNCATE TABLE TABLE_NAME; (ex: TRUNCATE TABLE customers;)

