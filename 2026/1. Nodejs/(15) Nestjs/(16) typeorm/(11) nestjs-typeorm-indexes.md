# NestJS TypeORM Indexes & Unique Constraints

## Table of Contents
1. [What is an Index?](#1-what-is-an-index)
2. [@Index](#2-index)
3. [@Unique](#3-unique)
4. [Composite Index & Unique](#4-composite-index--unique)
5. [Index on Relations](#5-index-on-relations)
6. [QueryBuilder with Indexes](#6-querybuilder-with-indexes)
7. [Real Example](#7-real-example)
8. [Summary](#8-summary)

---

## 1. What is an Index?

An index is a database structure that speeds up **search and filter queries** on a column.

```
Without index → DB scans every row to find match  (slow 🐢)
With index    → DB jumps directly to the match     (fast ⚡)
```

```sql
-- without index on name — full table scan
SELECT * FROM items WHERE name = 'Laptop'  -- checks every row

-- with index on name — direct lookup
SELECT * FROM items WHERE name = 'Laptop'  -- jumps straight to it
```

> Indexes speed up **reads** but slightly slow down **writes** (insert/update/delete) because the index must be updated too.

---

## 2. @Index

### On a single column (decorator on property)
```typescript
import { Column, Entity, Index } from "typeorm";

@Entity('items')
export class Item {

    @Index()                    // basic index
    @Column()
    declare name: string;

    @Index('idx_items_status')  // named index
    @Column()
    declare status: string;
}
```

### On the entity class (more flexible)
```typescript
@Entity('items')
@Index(['name'])                        // single column
@Index(['name', 'status'])             // composite index
@Index('idx_items_name', ['name'])     // named composite index
export class Item {

    @Column()
    declare name: string;

    @Column()
    declare status: string;
}
```

### Unique index
```typescript
@Index({ unique: true })
@Column()
declare email: string;
```

### Fulltext index (MySQL)
```typescript
@Index({ fulltext: true })
@Column('text')
declare description: string;
```

### Sparse index (PostgreSQL)
```typescript
@Index({ sparse: true })
@Column({ nullable: true })
declare deletedAt: Date;
```

---

## 3. @Unique

`@Unique` enforces that a column (or combination of columns) has no duplicate values.

### On a single column (decorator on property)
```typescript
import { Column, Entity, Unique } from "typeorm";

@Entity('items')
export class Item {

    @Column({ unique: true })  // option 1 — via @Column option
    declare email: string;

    @Unique(['slug'])          // option 2 — via @Unique decorator (on class)
    declare slug: string;
}
```

### On the entity class
```typescript
@Entity('items')
@Unique(['email'])                    // single column unique
@Unique(['firstName', 'lastName'])    // composite unique (combination must be unique)
@Unique('uq_items_slug', ['slug'])    // named unique constraint
export class Item {

    @Column()
    declare email: string;

    @Column()
    declare slug: string;

    @Column()
    declare firstName: string;

    @Column()
    declare lastName: string;
}
```

> [!IMPORTANT]
> ### ⚠️ `@Column({ unique: true })` vs `@Unique`
>
> Both enforce uniqueness but differ slightly:
>
> | | `@Column({ unique: true })` | `@Unique` |
> |---|---|---|
> | Placement | On property | On class |
> | Single column | ✅ | ✅ |
> | Composite unique | ❌ | ✅ |
> | Named constraint | ❌ | ✅ |
>
> For **single column** → use `@Column({ unique: true })` (simpler)
> For **composite or named** → use `@Unique` on the class

---

## 4. Composite Index & Unique

### Composite index — speeds up queries that filter on multiple columns together
```typescript
@Entity('items')
@Index(['name', 'status'])        // queries filtering by both name AND status
@Index(['category', 'public'])    // queries filtering by both category AND public
export class Item {

    @Column()
    declare name: string;

    @Column()
    declare status: string;

    @Column()
    declare category: string;

    @Column({ default: true })
    declare public: boolean;
}
```

```sql
-- this query uses the composite index above ✅
SELECT * FROM items WHERE name = 'Laptop' AND status = 'active'

-- this does NOT use it ❌ (wrong column order)
SELECT * FROM items WHERE status = 'active'
```

> [!TIP]
> ### 💡 Column order matters in composite indexes
>
> The index is used only when you filter starting from the **leftmost column**:
>
> ```typescript
> @Index(['name', 'status', 'category'])
> ```
>
> ```
> ✅ WHERE name = ?
> ✅ WHERE name = ? AND status = ?
> ✅ WHERE name = ? AND status = ? AND category = ?
> ❌ WHERE status = ?           — skipped leftmost
> ❌ WHERE category = ?         — skipped leftmost
> ❌ WHERE status = ? AND category = ?  — skipped leftmost
> ```

### Composite unique — combination must be unique
```typescript
@Entity('items')
@Unique(['userId', 'productId'])  // same user can't have same product twice
export class OrderItem {

    @Column()
    declare userId: number;

    @Column()
    declare productId: number;
}
```

---

## 5. Index on Relations

TypeORM automatically creates an index on foreign key columns (`@ManyToOne`, `@OneToOne`), but you can add more:

```typescript
@Entity()
export class Comment {

    @Index()                                          // 👈 add index on foreign key
    @ManyToOne(() => Item, (item) => item.comments)
    declare item: Item;
}
```

---

## 6. QueryBuilder with Indexes

Indexes work automatically — you don't need to change your queries. The DB uses them automatically when the condition matches an indexed column:

```typescript
// if name has an index → this query is fast ⚡
await this.itemRepository
    .createQueryBuilder('item')
    .where('item.name = :name', { name: 'Laptop' })
    .getMany()

// if [name, status] has a composite index → this is fast ⚡
await this.itemRepository
    .createQueryBuilder('item')
    .where('item.name = :name', { name: 'Laptop' })
    .andWhere('item.status = :status', { status: 'active' })
    .getMany()
```

To verify MySQL is using your index:
```sql
EXPLAIN SELECT * FROM items WHERE name = 'Laptop';
-- look for 'key' column — it shows which index was used
```

---

## 7. Real Example

```typescript
// items/entities/item.entity.ts
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, Unique } from "typeorm";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Tag } from "./tag.entity";

enum ItemStatus {
    ACTIVE   = 'active',
    INACTIVE = 'inactive',
    DRAFT    = 'draft'
}

@Entity('items')
@Index(['name', 'status'])               // composite index for common filter
@Unique('uq_items_slug', ['slug'])       // named unique constraint
export class Item extends AbstractEntity<Item> {

    @Index()                             // single column index — fast name search
    @Column('nvarchar', { length: 255 })
    declare name: string;

    @Column({ unique: true })            // unique via @Column option
    declare slug: string;

    @Column('boolean', { default: true })
    declare public: boolean;

    @Index('idx_items_status')           // named index for status filtering
    @Column('enum', { enum: ItemStatus, default: ItemStatus.ACTIVE })
    declare status: ItemStatus;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    declare price: number;

    @OneToOne(() => Listing, { cascade: true })
    @JoinColumn()
    declare listing: Listing;

    @OneToMany(() => Comment, comment => comment.item, { cascade: true })
    declare comments: Comment[];

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    declare tags: Tag[];
}
```

---

## 8. Summary

### @Index

| Usage | Description |
|---|---|
| `@Index()` | Basic index on a column |
| `@Index('name')` | Named index |
| `@Index({ unique: true })` | Unique index |
| `@Index({ fulltext: true })` | Fulltext index (MySQL) |
| `@Index(['col1', 'col2'])` | Composite index (on class) |

### @Unique

| Usage | Description |
|---|---|
| `@Column({ unique: true })` | Unique on single column |
| `@Unique(['col'])` | Unique on single column (on class) |
| `@Unique(['col1', 'col2'])` | Composite unique constraint |
| `@Unique('name', ['col'])` | Named unique constraint |

### When to add an index

| Add index when | Don't add index when |
|---|---|
| Column is used in `WHERE` often | Column is rarely queried |
| Column is used in `ORDER BY` | Table has very few rows |
| Column is a foreign key | Column is updated very frequently |
| Column is used in `JOIN` | You have too many indexes already |

> **Rule of thumb:** Index columns you **search, filter, sort, or join on** frequently. Don't index everything — each index adds overhead to writes.
