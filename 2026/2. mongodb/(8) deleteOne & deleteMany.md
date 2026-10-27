(1) delete first single record or document
---------------------------------------------
==> db.users.deleteOne({id: 100}) // delete document that have id 100
==> db.users.deleteOne({}) // delete first document from the collection

(2) delete multiple records or documents from collection
----------------------------
==> db.users.deleteMany({name:'magdy'}) // delete all documents that have name magdy
==> db.users.deleteMany({}) // delete all documents from the collection