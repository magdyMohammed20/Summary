(1) collections
-----------------
==> like table in relational database which can store related data 
    stores data as json like objects which referred to as documents

(2) create collections
-------------------------
==> use collections_db : use this for create and select new database
==> db.users.insertOne({ name: 'Magdy'}) : insert to collection for create it and mongo will automatic create unique id for inserted data

(3) create empty collection
------------------------------
==> db.createCollection('collection_name')

(4) show collection of current selected db
-------------------------------------------------
==> show collections

(5) show collection data (show all documents)
--------------------------
==> db.users.find()

(6) numbers of documents that inside collection
-------------------------
==> db.users.countDocuments()

(7) capped collection (fixed size collection)
---------------------
==> db.createCollection("logs", {
        capped: true,
        size: 1048576,   // max size in bytes (required when capped)
        max: 5000,        // optional: max number of documents
    })

(8) delete collection
----------------------
==> db.logs.drop()