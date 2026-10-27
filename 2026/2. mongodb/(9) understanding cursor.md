(1) approach or problem
-------------------------
==> when runs [db.users.insertMany([....])] and inserted data is many objects In mongosh / the Mongo shell, when use find() returns a cursor, and the shell prints only the first 20 documents per batch.
==> The 20 comes from the default batch size that the shell and Compass use when printing a cursor.


(2) reason of find() that returns 20 document only
-----------------------------------------------------
==> Cursors are lazy. find() doesn’t load every document at once. It returns a cursor, and documents are fetched from the server in batches as you iterate. The shell just prints the first batch.
==> Protect the terminal and memory. A collection can hold millions of documents. Printing all of them would flood your screen, freeze the shell, and waste network bandwidth and RAM.
==> Better interactivity. Showing a small page, then letting you type (it) for more, keeps the shell responsive. It’s the same idea as pagination on a website.


(3) What’s actually happening under the hood
----------------------------------------------
==> The server returns the first batch (up to 101 documents, or 16 MB, whichever comes first, for the initial batch in the driver protocol).
==> The shell, however, only prints 20 per screen by default (displayBatchSize).
==> Typing it asks the cursor for the next 20.

(4) we use 'it' command for returns or get the next cursor

(5) cursor
------------
==> is pointer to a result set of a query it allows to iterate over the results one document at a time rather than fetching all the results at once

(6) first way to get all documents: use .toArray() method for calling all cursor or all next documents
---------------------------------------------------------------------------------------------------------
==> db.users.find().toArray() // prints all documents

(7) second way to get all documents: is to set the batch size
---------------------------------------------------------------
==> config.set("displayBatchSize", 50)   // mongosh

(8) loop through all documents for print specific message
----------------------------------------------------------------
==> db.users.find().forEach(function(user){
            print('user name' , user.name)
        }
    )