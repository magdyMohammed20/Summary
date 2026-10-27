(1) run mongo shell
---------------------
==> brew services start mongodb-community@8.0     # start the server in the background
==> brew services list                             # confirm it says "started"
==> mongosh                                        # open the shell

(2) list all available databases that have at least one collection and at least one document
--------------------------------------------------------------------------------------------------
==> show dbs

(3) list current selected db
------------------------------
==> db

(4) show collection of current selected db
-------------------------------------------------
==> show collections

(5) select database (if not exist will create new one and select it)
----------------------------------------------------------------------------
==> use db_name

(6) create collection and insert data
------------------------------------------
==> db.users.insertOne({id: 1 , name:'magdy'})

(7) drop database
------------------
==> db.dropDatabase()


