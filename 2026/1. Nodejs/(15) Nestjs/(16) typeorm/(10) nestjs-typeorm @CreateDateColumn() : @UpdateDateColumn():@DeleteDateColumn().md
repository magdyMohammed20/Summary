# NestJS TypeORM Auto Timestamps

## Table of Contents
1. [What are Auto Timestamps?](#1-what-are-auto-timestamps)
2. [Setup](#2-setup)
3. [All Timestamp Decorators](#3-all-timestamp-decorators)
4. [Customizing Timestamps](#4-customizing-timestamps)
5. [Querying with Timestamps](#5-querying-with-timestamps)
6. [Real Example](#6-real-example)
7. [Summary](#7-summary)

---

## 1. What are Auto Timestamps?

Auto timestamps are columns that TypeORM manages automatically — you never set them manually, TypeORM handles them on every insert or update.

```
@CreateDateColumn  →  set once on INSERT, never changes
@UpdateDateColumn  →  set on INSERT, updated on every save
@DeleteDateColumn  →  set on soft delete, null when active
```

---

## 2. Setup

Add timestamp decorators to `AbstractEntity` so all entities get them automatically:

```typescript
// database/abstract.entity.ts
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export class AbstractEntity<T> {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;  // auto-set when record is created

    @UpdateDateColumn()
    updatedAt: Date;  // auto-updated on every save

    @DeleteDateColumn()
    deletedAt: Date;  // null = active, has value = soft deleted

    constructor(entity?: Partial<T>) {
        Object.assign(this, entity);
    }
}
```

> Since all entities extend `AbstractEntity`, they all get `createdAt`, `updatedAt`, and `deletedAt` automatically — no extra code needed.

---

## 3. All Timestamp Decorators

### `@CreateDateColumn`
```typescript
@CreateDateColumn()
createdAt: Date;
```
- Set **once** when the record is first inserted
- Never changes after that
- You don't need to set it manually — TypeORM handles it

```sql
-- on INSERT
INSERT INTO items (name, createdAt) VALUES ('Laptop', '2026-08-12 03:44:41')

-- on UPDATE — createdAt stays the same
UPDATE items SET name = 'New Laptop' WHERE id = 1
-- createdAt is NOT changed ✅
```

---

### `@UpdateDateColumn`
```typescript
@UpdateDateColumn()
updatedAt: Date;
```
- Set on INSERT (same as `createdAt` initially)
- **Auto-updated** on every `save()` or `update()`
- You don't need to set it manually — TypeORM handles it

```sql
-- on INSERT
INSERT INTO items (name, updatedAt) VALUES ('Laptop', '2026-08-12 03:44:41')

-- on UPDATE — updatedAt changes automatically
UPDATE items SET name = 'New Laptop', updatedAt = '2026-08-12 05:00:00' WHERE id = 1
```

---

### `@DeleteDateColumn`
```typescript
@DeleteDateColumn()
deletedAt: Date;  // null by default
```
- `null` when record is active
- Set to current timestamp on `softDelete()`
- Reset to `null` on `restore()`
- Rows with `deletedAt` set are excluded from all queries automatically

```sql
-- on softDelete
UPDATE items SET deletedAt = '2026-08-12 03:44:41' WHERE id = 1

-- on restore
UPDATE items SET deletedAt = NULL WHERE id = 1
```

---

### `@VersionColumn`
```typescript
@VersionColumn()
version: number;  // starts at 1, increments on every update
```
- Starts at `1` on INSERT
- Auto-increments on every `save()`
- Used for **optimistic locking** — prevents concurrent update conflicts

```sql
-- on INSERT
INSERT INTO items (name, version) VALUES ('Laptop', 1)

-- on UPDATE
UPDATE items SET name = 'New Laptop', version = 2 WHERE id = 1
-- next save → version = 3, then 4, etc.
```

---

## 4. Customizing Timestamps

### Custom column type
```typescript
// default is datetime — can change to timestamp
@CreateDateColumn({ type: 'timestamp' })
createdAt: Date;

@UpdateDateColumn({ type: 'timestamp' })
updatedAt: Date;
```

### Custom column name in DB
```typescript
@CreateDateColumn({ name: 'created_at' })
createdAt: Date;

@UpdateDateColumn({ name: 'updated_at' })
updatedAt: Date;
```

### Custom precision (milliseconds)
```typescript
@CreateDateColumn({ precision: 3 })  // store milliseconds
createdAt: Date;
```

### Timezone-aware timestamps
```typescript
@CreateDateColumn({ type: 'timestamptz' })  // PostgreSQL only
createdAt: Date;
```

### Store as string instead of Date
```typescript
@CreateDateColumn({ type: 'varchar' })
createdAt: string;  // stored as ISO string
```

---

## 5. Querying with Timestamps

### Filter by date range
```typescript
import { Between, LessThan, MoreThan } from 'typeorm'

// items created today
await this.itemRepository.find({
    where: {
        createdAt: MoreThan(new Date('2026-08-12'))
    }
})

// items updated in a range
await this.itemRepository.find({
    where: {
        updatedAt: Between(
            new Date('2026-08-01'),
            new Date('2026-08-12')
        )
    }
})
```

### With QueryBuilder
```typescript
// items created in last 7 days
const sevenDaysAgo = new Date()
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

await this.itemRepository
    .createQueryBuilder('item')
    .where('item.createdAt > :date', { date: sevenDaysAgo })
    .getMany()

// order by newest first
await this.itemRepository
    .createQueryBuilder('item')
    .orderBy('item.createdAt', 'DESC')
    .getMany()

// recently updated
await this.itemRepository
    .createQueryBuilder('item')
    .orderBy('item.updatedAt', 'DESC')
    .take(10)
    .getMany()
```

---

## 6. Real Example

```typescript
// database/abstract.entity.ts
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";

export class AbstractEntity<T> {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @VersionColumn()
    version: number;

    constructor(entity?: Partial<T>) {
        Object.assign(this, entity);
    }
}
```

**Response shape after adding timestamps:**
```json
{
    "id": 1,
    "name": "Laptop",
    "public": true,
    "createdAt": "2026-08-12T03:44:41.000Z",
    "updatedAt": "2026-08-12T05:00:00.000Z",
    "deletedAt": null,
    "version": 3
}
```

---

## 7. Summary

| Decorator | Set on | Changes on | Use for |
|---|---|---|---|
| `@CreateDateColumn` | INSERT | Never | Know when record was created |
| `@UpdateDateColumn` | INSERT | Every save | Know when record was last modified |
| `@DeleteDateColumn` | softDelete | restore | Soft delete support |
| `@VersionColumn` | INSERT | Every save | Optimistic locking, track revisions |

| Option | Description |
|---|---|
| `type` | Column type (`datetime`, `timestamp`, `timestamptz`) |
| `name` | Custom column name in DB (`created_at` instead of `createdAt`) |
| `precision` | Decimal precision for milliseconds |

> **Best practice:** Put all timestamp decorators in `AbstractEntity` so every entity gets them automatically without repeating code.
