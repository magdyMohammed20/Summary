(1) insert data for queries
-----------------------------
==> db.users.insertMany([
  {
    name: "name1",
    age: 20,
    address: ["New York", "USA"],
    purchases: [
      { item: "Laptop", brand: "Apple", price: 1200, qty: 1, date: new Date("2025-01-15") },
      { item: "Mouse", brand: "Logitech", price: 25, qty: 2, date: new Date("2025-02-03") }
    ]
  },
  {
    name: "name2",
    age: 25,
    address: ["Riyadh", "KSA"],
    purchases: [
      { item: "Phone", brand: "Samsung", price: 800, qty: 1, date: new Date("2025-03-10") }
    ]
  },
  {
    name: "name3",
    age: 31,
    address: ["Dubai", "UAE"],
    purchases: [
      { item: "Headphones", brand: "Sony", price: 150, qty: 1, date: new Date("2025-01-22") },
      { item: "Keyboard", brand: "Logitech", price: 90, qty: 1, date: new Date("2025-04-05") },
      { item: "Monitor", brand: "Dell", price: 300, qty: 2, date: new Date("2025-05-18") }
    ]
  },
  {
    name: "name4",
    age: 28,
    address: ["Cairo", "Egypt"],
    purchases: []
  },
  {
    name: "name5",
    age: 35,
    address: ["London", "UK"],
    purchases: [
      { item: "Tablet", brand: "Apple", price: 450, qty: 1, date: new Date("2025-02-27") },
      { item: "Charger", brand: "Anker", price: 30, qty: 3, date: new Date("2025-06-01") }
    ]
  }
])

(2) Get all users that address contains 'USA'
----------------------------------------------
==> db.users.find({address: "USA"})


(3) Replace only the “UK” element with “RUS” (keeps the array)
---------------------------------------------
==> db.users.updateMany(
        { address: "UK" },
        { $set: { "address.$": "RUS" } }
    )

(4) replace whole address array of "UK"
------------
==> db.users.updateMany(
  { address: "UK" },
  { $set: { address: ["Moscow", "RUS"] } }
)

(5) replace the first element in the address array
----------------------
==> db.users.updateMany(
        { address: 'RUS' } , // if address contains 'RUS' replace the first address element with 'Moscow'
        {
            $set: {"address.0": "Moscow"}
        }
    )

(6) get all users that 'purchases' array have any product with 'Apple' brand
-----------------------
==> db.users.find({"purchases.brand": "Apple"})

(7) get all users which have address "UK" or "USA"
-----------------------
==> db.users.find({address: {$in : ["USA" , "UK"] }}) // use $in

(8) get all users which have Not have address "UK" or "USA" 
-----------------------
==> db.users.find({address: {$nin : ["USA" , "UK"] }}) // use $nin

(9) get all users which address is "Egypt" and "Cairo" only
------------------------------------------------
==> db.users.find({address: {$all : ["Egypt" , "Cairo"] }}) // arrangement not necessary