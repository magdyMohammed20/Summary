# NestJS TypeORM Transactions

## Table of Contents
1. [What is a Transaction?](#1-what-is-a-transaction)
2. [Why Use Transactions?](#2-why-use-transactions)
3. [Transaction with EntityManager](#3-transaction-with-entitymanager)
4. [Real Example — Update with Multiple Operations](#4-real-example--update-with-multiple-operations)
5. [What Happens on Error?](#5-what-happens-on-error)
6. [Summary](#6-summary)

---

## 1. What is a Transaction?

A **transaction** is a group of database operations that are treated as a **single unit**.

> Either **ALL operations succeed** together, or **ALL are rolled back** if any one fails.

```
BEGIN TRANSACTION
  ├── op1: save item      ✅
  ├── op2: save tag       ✅
  └── op3: save listing   ❌ error!
ROLLBACK — nothing is saved
```

---

## 2. Why Use Transactions?

Without a transaction, if one operation fails, the others **already committed** to the DB — leaving your data in an **inconsistent state**.

```
// ❌ Without transaction — dangerous
await entityManager.save(item)   // saved ✅
await entityManager.save(tag)    // saved ✅
await entityManager.save(listing) // failed ❌ — but item and tag are already in DB!
```

```
// ✅ With transaction — safe
await entityManager.transaction(async (entityManager) => {
    await entityManager.save(item)    // not committed yet
    await entityManager.save(tag)     // not committed yet
    await entityManager.save(listing) // failed ❌ — ALL rolled back, DB untouched
})
```

---

## 3. Transaction with EntityManager

NestJS + TypeORM provides `entityManager.transaction()` to wrap multiple operations safely.

### Basic Structure
```typescript
await this.entityManager.transaction(async (entityManager) => {
    // all operations here use the SAME transaction
    await entityManager.save(entity1)
    await entityManager.save(entity2)
    await entityManager.save(entity3)
    // if any fails → all rolled back automatically
})
```

> [!IMPORTANT]
> ### ⚠️ Use the transaction's `entityManager` inside the callback
>
> Inside the transaction callback, always use the `entityManager` parameter
> passed by the callback — **not** `this.entityManager` or `this.repository`.
>
> ```typescript
> // ❌ Wrong — uses the global entityManager, outside the transaction
> await this.entityManager.transaction(async (entityManager) => {
>     await this.entityManager.save(item)  // not part of the transaction!
> })
>
> // ✅ Correct — uses the transaction's entityManager
> await this.entityManager.transaction(async (entityManager) => {
>     await entityManager.save(item)  // part of the transaction ✅
> })
> ```

---

## 4. Real Example — Update with Multiple Operations

```typescript
async update(id: number, updateItemDto: UpdateItemDto) {
    await this.entityManager.transaction(async (entityManager) => {

        // --- Fetch ---
        const item = await entityManager.findOne(Item, {
            where: { id },
            relations: { listing: true, comments: true, tags: true }
        })

        if (!item) {
            throw new NotFoundException(`Item #${id} not found`)
        }

        // --- Prepare data ---
        const { listing, ...itemDto } = updateItemDto

        const comments = updateItemDto.comments?.map(
            (createCommentDto) => new Comment(createCommentDto)
        ) ?? []

        const tags = updateItemDto.tags?.map(
            (createTagDto) => new Tag(createTagDto)
        ) ?? []

        Object.assign(item, itemDto)

        if (listing) {
            item.listing = { ...item.listing, ...listing }
        }

        item.comments = comments
        item.tags = tags

        // --- op1: save updated item ---
        await entityManager.save(item)

        // --- op2: create a new tag ---
        const tagContent = `${Math.random()}`
        const newTag = new Tag({ content: tagContent })
        await entityManager.save(newTag)

        // if op2 fails → op1 is also rolled back ✅
    })
}
```

### Flow Diagram
```
POST /items/:id (update)
        │
        ▼
BEGIN TRANSACTION
        │
        ├── findOne(item)
        │
        ├── op1: entityManager.save(item)       ─┐
        │                                         │ all or nothing
        └── op2: entityManager.save(newTag)      ─┘
                │
        ┌───────┴───────┐
        ▼               ▼
    success          any error
        │               │
    COMMIT          ROLLBACK
    (saved)        (nothing saved)
```

---

## 5. What Happens on Error?

```typescript
await this.entityManager.transaction(async (entityManager) => {

    await entityManager.save(item)    // ✅ executed

    throw new Error('something went wrong') // ❌ error thrown

    await entityManager.save(newTag)  // ⏭️ never reached
})
// Result: item is NOT saved — transaction rolled back
```

TypeORM catches any error thrown inside the transaction callback and automatically issues a `ROLLBACK`.

---

## 6. Summary

| Concept | Description |
|---|---|
| `entityManager.transaction()` | Wraps operations in a single DB transaction |
| `COMMIT` | All operations succeeded — changes saved to DB |
| `ROLLBACK` | Any operation failed — all changes undone |
| Callback `entityManager` | Must use this inside the transaction, not `this.entityManager` |
| Error handling | Any thrown error triggers automatic rollback |

> **Rule of thumb:** Any time you have **2 or more DB operations** that depend on each other, wrap them in a transaction.
