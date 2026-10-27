(1) update single record or document
--------------------------
==> db.users.updateOne(
        {_id: 100},
        { $set : {age : 50 , gender: 'female'}}
    ) // find first record with id 100 and update age to 50 and gender to female

(2) update many records or document
---------------------------
==> db.users.updateMany(
        {gender: 'male'},
        {$set: {age: 24}}
    ) // find all records that have gender male and set age of them to 24

(3) replace specific record or document
------------------------------------------
==> db.users.replaceOne({name:'mego2'} , {}) // reset or replace first finded record that have name mego2
==> db.users.replaceOne({name:'mego2'} , {age: 30}) // replace first finded record that have name mego2 by {age : 30}

