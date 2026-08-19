# NestJS TypeORM @Column Options

## Table of Contents
1. [Basic Syntax](#1-basic-syntax)
2. [Column Types](#2-column-types)
3. [Column Options](#3-column-options)
4. [Special Column Decorators](#4-special-column-decorators)
5. [Real Example](#5-real-example)
6. [Summary](#6-summary)

---

## 1. Basic Syntax

```typescript
// type only
@Column('nvarchar')
name: string;

// options only
@Column({ length: 255, nullable: false })
name: string;

// type + options
@Column('nvarchar', { length: 255, nullable: false })
name: string;
```

---

## 2. Column Types

### String Types
```typescript
@Column('varchar', { length: 255 })     // variable length string (default)
@Column('nvarchar', { length: 255 })    // unicode variable length string
@Column('char', { length: 10 })         // fixed length string
@Column('text')                         // long text, no length limit
@Column('tinytext')                     // very short text
@Column('mediumtext')                   // medium length text
@Column('longtext')                     // very long text
```

### Number Types
```typescript
@Column('int')                          // integer
@Column('tinyint')                      // small integer (0-255)
@Column('smallint')                     // small integer
@Column('bigint')                       // large integer
@Column('float')                        // floating point
@Column('double')                       // double precision float
@Column('decimal', { precision: 10, scale: 2 })  // exact decimal (e.g. price)
```

### Boolean
```typescript
@Column('boolean')                      // true/false
@Column('tinyint')                      // MySQL stores boolean as tinyint(1)
```

### Date Types
```typescript
@Column('date')                         // date only (2026-08-12)
@Column('time')                         // time only (03:44:41)
@Column('datetime')                     // date + time
@Column('timestamp')                    // timestamp (auto timezone)
```

### Other Types
```typescript
@Column('json')                         // JSON object
@Column('enum', { enum: ['admin', 'user', 'guest'] })  // enum
@Column('uuid')                         // UUID string
@Column('blob')                         // binary data
```

---

## 3. Column Options

### `nullable` — allow null values
```typescript
@Column({ nullable: true })   // column can be NULL
declare description: string;

@Column({ nullable: false })  // column cannot be NULL (default)
declare name: string;
```

### `default` — set a default value
```typescript
@Column({ default: true })
declare public: boolean;

@Column({ default: 0 })
declare rating: number;

@Column({ default: 'active' })
declare status: string;

@Column({ default: () => 'CURRENT_TIMESTAMP' })  // SQL expression
declare createdAt: Date;
```

### `length` — max character length
```typescript
@Column('varchar', { length: 255 })
declare name: string;

@Column('char', { length: 10 })
declare code: string;
```

### `unique` — enforce unique values
```typescript
@Column({ unique: true })
declare email: string;

@Column({ unique: true })
declare slug: string;
```

### `select` — exclude from SELECT by default
```typescript
@Column({ select: false })  // won't appear in find() results
declare password: string;

// to include it explicitly
await this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.password')  // 👈 must explicitly select
    .getOne()
```

### `name` — custom column name in DB
```typescript
@Column({ name: 'is_public' })  // DB column is 'is_public', property is 'public'
declare public: boolean;

@Column({ name: 'full_name' })
declare fullName: string;
```

### `precision` and `scale` — for decimal numbers
```typescript
@Column('decimal', { precision: 10, scale: 2 })
// precision = total digits, scale = digits after decimal
// e.g. 99999999.99
declare price: number;
```

### `enum` — restrict to specific values
```typescript
enum UserRole {
    ADMIN = 'admin',
    USER  = 'user',
    GUEST = 'guest'
}

@Column('enum', { enum: UserRole, default: UserRole.USER })
declare role: UserRole;
```

### `array` — store arrays (PostgreSQL only)
```typescript
@Column('text', { array: true })
declare tags: string[];
```

### `transformer` — transform value before save / after load
```typescript
@Column({
    transformer: {
        to: (value: string) => value.toLowerCase(),    // before save to DB
        from: (value: string) => value.toUpperCase(),  // after load from DB
    }
})
declare email: string;
```

### `comment` — add a comment to the column in DB
```typescript
@Column({ comment: 'The user display name' })
declare name: string;
```

### `insert` and `update` — control when column is written
```typescript
@Column({ insert: false })   // excluded from INSERT — DB handles it
declare createdAt: Date;

@Column({ update: false })   // excluded from UPDATE — never changes after insert
declare createdAt: Date;
```

---

## 4. Special Column Decorators

### `@PrimaryGeneratedColumn` — auto-increment primary key
```typescript
@PrimaryGeneratedColumn()
id: number;

@PrimaryGeneratedColumn('uuid')  // UUID instead of integer
id: string;
```

### `@CreateDateColumn` — auto-set on insert
```typescript
@CreateDateColumn()
createdAt: Date;  // automatically set when record is created
```

### `@UpdateDateColumn` — auto-set on update
```typescript
@UpdateDateColumn()
updatedAt: Date;  // automatically updated on every save
```

### `@DeleteDateColumn` — soft delete timestamp
```typescript
@DeleteDateColumn()
deletedAt: Date;  // null = active, has value = soft deleted
```

### `@VersionColumn` — optimistic locking
```typescript
@VersionColumn()
version: number;  // auto-increments on every update
```

---

## 5. Real Example

```typescript
// items/entities/item.entity.ts
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
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
export class Item extends AbstractEntity<Item> {

    // unicode string with max length
    @Column('nvarchar', { length: 255 })
    declare name: string;

    // boolean with default value
    @Column('boolean', { default: true })
    declare public: boolean;

    // optional description
    @Column('text', { nullable: true })
    declare description: string;

    // exact decimal for price
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    declare price: number;

    // enum with default
    @Column('enum', { enum: ItemStatus, default: ItemStatus.ACTIVE })
    declare status: ItemStatus;

    // unique slug
    @Column('varchar', { length: 255, unique: true, nullable: true })
    declare slug: string;

    // hidden from default select
    @Column('varchar', { select: false, nullable: true })
    declare internalNote: string;

    // custom DB column name
    @Column('int', { name: 'view_count', default: 0 })
    declare viewCount: number;

    // relations
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

```typescript
// database/abstract.entity.ts
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class AbstractEntity<T> {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    constructor(entity?: Partial<T>) {
        Object.assign(this, entity);
    }
}
```

---

## 6. Summary

### Column Options

| Option | Type | Description |
|---|---|---|
| `type` | string | Column data type (`varchar`, `int`, `boolean`, etc.) |
| `length` | number | Max character length |
| `nullable` | boolean | Allow NULL values (default: `false`) |
| `default` | any | Default value if none provided |
| `unique` | boolean | Enforce unique constraint |
| `select` | boolean | Include in SELECT by default (default: `true`) |
| `name` | string | Custom column name in DB |
| `precision` | number | Total digits for decimal |
| `scale` | number | Decimal digits for decimal |
| `enum` | array/enum | Restrict to specific values |
| `transformer` | object | Transform value before save / after load |
| `comment` | string | Column comment in DB |
| `insert` | boolean | Include in INSERT (default: `true`) |
| `update` | boolean | Include in UPDATE (default: `true`) |

### Special Decorators

| Decorator | Description |
|---|---|
| `@PrimaryGeneratedColumn()` | Auto-increment primary key |
| `@PrimaryGeneratedColumn('uuid')` | UUID primary key |
| `@CreateDateColumn()` | Auto-set timestamp on insert |
| `@UpdateDateColumn()` | Auto-update timestamp on save |
| `@DeleteDateColumn()` | Soft delete timestamp |
| `@VersionColumn()` | Auto-increment version on update |

### Common Column Types

| Type | Use for |
|---|---|
| `varchar` / `nvarchar` | Short strings, names, emails |
| `text` | Long strings, descriptions, content |
| `int` / `bigint` | Integer numbers, counts, IDs |
| `decimal` | Prices, exact numbers |
| `boolean` | Flags, toggles |
| `datetime` / `timestamp` | Dates and times |
| `enum` | Fixed set of values (status, role) |
| `json` | Flexible structured data |
