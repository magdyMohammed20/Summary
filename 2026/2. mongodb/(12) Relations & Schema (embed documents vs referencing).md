(1) Data Modeling
-------------------
==> designing structure of the data to efficiently store and retrieve information
    which mongodb uses flexible schema , allowing to adapt to changing data requirements

(2) ways of implement relations
--------------------------------
==> embeded documents
==> referencing

(3) embeded documents
-----------------------
==> Sample: customer document can contains nested documents for orders and each order have it's own products

    {
        name: "customer_name",
        orders:[
            {
                order_id: 1,
                products:[
                    {id: 1 , name: "product1"},
                    {id: 2 , name: "product2"}
                ]
            },
            {
                order_id: 2,
                products:[
                    {id: 3 , name: "product3"},
                    {id: 4 , name: "product4"}
                ]
            }
        ]
    }

(4) advantages and disadvantages for (embeded documents)
---------------

==> Advantage:

    • All the information is present in the same document of a collection. 
    So here, we do not have to query multiple tables to fetch all the related data. 
    This makes the query faster and improves the performance.

==> Disadvantage:

    • This can lead to redundant or duplicate data in the collection. (as product can be duplicated for each order in each user)
    • Since we are requesting a document, which stores all the information related to a given entity, it might also require higher network bandwidth.
    • The maximum size of a document cannot exceed 16MB. 
    In this approach, since all the information is stored in the same document, it might lead to increase in document size, and it is possible that the document size might exceed 16 MB limit.

(5) referencing
-----------------
==> we store data in different collections and we reference the related data from one collection to another collection using it's object id
==> Sample: in customer collection can include the array of orders which contains 'id' for each order
            in orders collection can include the array of products which contains 'id' for each product
            in products collections will contains the normal products data


(6) advantages and disadvantages for (referencing)
---------------
==> Advantage:

    • We have less or no redundant data at all.
    • The documents are leaner and most of the time it will fit the 16 MB size limit of a document.

==> Disadvantage:

    • To fetch all the related data, we will have to query multiple collections. 
    And this can effect the performance of the application.

(7) criteria that must consider for choose between embeded documents and referencing
----------------------
==> Related Data Size : For embeded documents ensure that data must not exceed the limit for each document
==> Data Redundancy : the related data in embeded documents shouldn't create too many duplicate records
==> Data Growth Frequency (embeded documents): number of related data stored as embeded document shouldn't grow idefinitely over a period
==> closeness of relations (embeded documents) : is it always required to fetch the related data with the parent data
==> Frequency of Read/Write : is the related data stored as embeded documents is read or updated more frequently, use reference approach