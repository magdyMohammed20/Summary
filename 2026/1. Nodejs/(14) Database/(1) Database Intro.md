(1) Database
--------------
==> Organized Collection of related data stored electronically and managed 
so it can be efficiently accessed, updated, and retrieved.

(2) Why DB?
-------------
==> Efficient storage : Stores large amounts of data in an organized structure.
==> Fast retrieval : Find specific data quickly using queries and indexes.
==> Easy updates : Insert, update, and delete data without manually editing files.
==> Data consistency : Prevents duplicate and inconsistent data through constraints and relationships.
==> Concurrency : Allows many users to access and modify data at the same time safely.
==> Security : Controls who can read or modify different parts of the data.
==> Backup and recovery : Protects against data loss and helps restore data after failures.
==> Data relationships : Connects related information efficiently.

(3) DB Types
--------------
==> classified into SQL (Relational) and NoSQL (Non-relational) databases.

(4) SQL vs NoSQL Databases
--------------------------

SQL (RDBMS)
===========
- Stores data in related tables (rows & columns).
- Fixed schema.
- Uses SQL.
- Supports ACID transactions.
- Strong consistency.
- Best for structured data and complex relationships.
- Scales mainly vertically.
- Examples: MySQL, PostgreSQL, SQL Server, Oracle.

NoSQL
======
- Stores data as Documents, Key-Value, Columns, or Graphs.
- Flexible schema.
- Database-specific queries/APIs.
- Usually follows BASE (some support ACID).
- Designed for horizontal scaling.
- Best for large-scale, flexible, or unstructured data.
- Examples: MongoDB, Redis, Cassandra, Neo4j.

SQL vs NoSQL
============
SQL    → Structured data, strong consistency, complex queries.
NoSQL → Flexible schema, high scalability, high-performance workloads.


(5) ACID transactions
-----------------------
==> is a set of properties—Atomicity, Consistency, Isolation, and Durability—that guarantees database transactions are executed reliably, maintaining data correctness even in the presence of failures or concurrent access.

