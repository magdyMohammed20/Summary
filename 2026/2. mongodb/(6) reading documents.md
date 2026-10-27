(1) insert one
-----------------
==> db.users.insertOne({name:'magdy'})

(2) insert many
-----------------
==> db.users.insertMany([{name:'magdy'} , {name: 'hossam'}])

(3) find all data
------------------
==> db.users.find()

(4) return first inserted document
------------------
==> db.users.findOne()

(5) find multiple data
--------------------------------
==> db.users.find({name: 'magdy'}) // find all records with name magdy

(6) find single data
----------------------
==> db.users.findOne({gender: 'male'}) // find first record with gender male
==> db.users.findOne({_id: ObjectId("6ad3f318e0667f6168db1441")}) // find record with specific id

(7) find with AND
--------------------
==> db.users.findOne({name: 'magdy' , gender: 'male'}) // find first record with name 'magdy' and gender male
==> db.users.find({name: 'magdy' , gender: 'male'}) // find all records with name 'magdy' and gender male

(8) projection
----------------
==> mechanism used to specify which fields of a document should be included or excluded from the result set when performing a query
==> for exlude field set value to 0 or false and if include set value to 1 or true
==> EX: db.users.find({gender:'male'} , {gender:false}) // find record that have gender male and exclude the gender field from search result
==> EX: db.users.find({gender:'male'} , {gender:0}) // find record that have gender male and exclude the gender field from search result
==> EX: db.users.find({gender:'male'} , {_id: 0 , gender: 0}) // find record that have gender male and exclude the gender and _id fields from search result