(1) mongodb document
---------------------
==> flexible json like format which are the fundamental units of data and analogous to rows in relational dbs 
==> is data structure composed of field-value pairs similar to json object

(2) documents is schemaless which mean each document can have different structure (fields)

(3) document supports more datatypes (Integer - string - boolean - array - object - null - date - objectId - binary data - regex - double, ...)

(4) advantages
---------------
==> flexibilty: fields can differ accross documents in same collection
==> embeded relationships: allow storing related data together in one document 
==> rich queries: mongo provides powerful query operators to work with document structures 
==> easy of use: json like syntax is intuitive for devs familiar with js and json

(5) limits of document
------------------------
==> size limit : single document can't exceed 16 MB in size if larger you should use GridFS for storing large files 
==> schema management: lack of enforced schema can lead to inconsistent data if not carefully managed