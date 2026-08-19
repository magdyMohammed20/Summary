# NestJS TypeORM QueryBuilder

## Table of Contents
1. [What is QueryBuilder?](#1-what-is-querybuilder)
2. [Creating a QueryBuilder](#2-creating-a-querybuilder)
3. [SELECT Queries](#3-select-queries)
4. [INSERT Queries](#4-insert-queries)
5. [UPDATE Queries](#5-update-queries)
6. [DELETE Queries](#6-delete-queries)
7. [Relations](#7-relations)
8. [Pagination](#8-pagination)
9. [Transactions with QueryBuilder](#9-transactions-with-querybuilder)
10. [Full CRUD Example](#10-full-crud-example)
11. [QueryBuilder vs Repository Methods](#11-querybuilder-vs-repository-methods)
12. [Summary](#12-summary)

---

## 1. What is QueryBuilder?

QueryBuilder is one of the most powerful features of TypeORM — it allows you to build SQL queries using elegant and convenient syntax, execute them, and get automatically transformed entities.

```
Repository methods     →    simple, fast to write
QueryBuilder           →    complex queries, full control over SQL
```

---

## 2. Creating a QueryBuilder

There are two ways to create a QueryBuilder:

### From Repository
```typescript
// uses Item as the base entity
this.itemRepository.createQueryBuilder('item')
```

### From EntityManager
```typescript
// more flexible — can target any entity
this.entityManager.createQueryBuilder(Item, 'item')
this.entityManager.createQueryBuilder()  // for insert/update/delete
```

> The string `'item'` is the **alias** — used to reference the entity in conditions and joins.

---

## 3. SELECT Queries

### Get all
```typescript
const items = await this.itemRepository
    .createQueryBuilder('item')
    .getMany()
```

### Get one
```typescript
const item = await this.itemRepository
    .createQueryBuilder('item')
    .where('item.id = :id', { id })
    .getOne()
```

### Get with count
```typescript
const [items, total] = await this.itemRepository
    .createQueryBuilder('item')
    .getManyAndCount()
```

### Select specific columns only
```typescript
const items = await this.itemRepository
    .createQueryBuilder('item')
    .select(['item.id', 'item.name'])  // only fetch id and name
    .getMany()
```

### Where conditions
```typescript
// single condition
.where('item.id = :id', { id })

// multiple conditions (AND)
.where('item.public = :public', { public: true })
.andWhere('item.name = :name', { name: 'Laptop' })

// OR condition
.where('item.name = :name', { name: 'Laptop' })
.orWhere('item.name = :name', { name: 'Phone' })

// IN condition
.where('item.id IN (:...ids)', { ids: [1, 2, 3] })

// LIKE condition
.where('item.name LIKE :name', { name: '%laptop%' })

// IS NULL
.where('item.listing IS NULL')

// BETWEEN
.where('item.price BETWEEN :min AND :max', { min: 10, max: 100 })
```

### Order, Group, Having
```typescript
// order by
.orderBy('item.name', 'ASC')
.addOrderBy('item.id', 'DESC')  // secondary sort

// group by
.groupBy('item.name')
.addGroupBy('item.id')

// having
.having('COUNT(item.id) > :count', { count: 5 })
```

### Raw SQL result
```typescript
const result = await this.itemRepository
    .createQueryBuilder('item')
    .select('COUNT(item.id)', 'total')
    .getRawOne()

// result = { total: '10' }
```

```typescript
const results = await this.itemRepository
    .createQueryBuilder('item')
    .select(['item.name', 'COUNT(item.id) as total'])
    .groupBy('item.name')
    .getRawMany()
```

---

## 4. INSERT Queries

### Insert one
```typescript
const result = await this.entityManager
    .createQueryBuilder()
    .insert()
    .into(Item)
    .values({
        name: 'Laptop',
        public: true
    })
    .execute()

const insertedId = result.identifiers[0].id
```

### Insert many
```typescript
await this.entityManager
    .createQueryBuilder()
    .insert()
    .into(Comment)
    .values([
        { content: 'Great!', item: { id: 1 } },
        { content: 'Nice!',  item: { id: 1 } },
    ])
    .execute()
```

### Insert with relation (foreign key)
```typescript
await this.entityManager
    .createQueryBuilder()
    .insert()
    .into(Comment)
    .values(
        comments.map((comment) => ({
            ...comment,
            item: { id: itemId }  // 👈 set foreign key
        }))
    )
    .execute()
```

> [!IMPORTANT]
> ### ⚠️ Insert order matters with foreign keys
>
> Always insert the **parent** before the **child**:
>
> ```
> ✅ Correct order:
> 1. insert listing   → get listingId
> 2. insert item      → use listingId
> 3. insert comments  → use itemId
> 4. insert tags      → use itemId
> ```

---

## 5. UPDATE Queries

### Update by condition
```typescript
await this.entityManager
    .createQueryBuilder()
    .update(Item)
    .set({ name: 'New Name', public: false })
    .where('id = :id', { id })
    .execute()
```

### Update with spread
```typescript
const { listing, comments, tags, ...itemDto } = updateItemDto

await this.entityManager
    .createQueryBuilder()
    .update(Item)
    .set(itemDto)           // spread only item fields
    .where('id = :id', { id })
    .execute()
```

### Bulk update
```typescript
await this.entityManager
    .createQueryBuilder()
    .update(Item)
    .set({ public: false })
    .where('public = :public', { public: true })
    .execute()
```

### Increment / Decrement a value
```typescript
await this.entityManager
    .createQueryBuilder()
    .update(Listing)
    .set({ rating: () => 'rating + 1' })  // raw SQL expression
    .where('id = :id', { id })
    .execute()
```

---

## 6. DELETE Queries

### Delete by id
```typescript
await this.entityManager
    .createQueryBuilder()
    .delete()
    .from(Item)
    .where('id = :id', { id })
    .execute()
```

### Bulk delete
```typescript
await this.entityManager
    .createQueryBuilder()
    .delete()
    .from(Comment)
    .where('itemId = :id', { id })  // delete all comments of an item
    .execute()
```

### Delete with condition
```typescript
await this.entityManager
    .createQueryBuilder()
    .delete()
    .from(Item)
    .where('public = :public AND name LIKE :name', {
        public: false,
        name: '%old%'
    })
    .execute()
```

> [!IMPORTANT]
> ### ⚠️ Always delete children before parents
>
> MySQL enforces foreign key constraints — delete in reverse creation order:
>
> ```
> Create order:  listing → item → comments → tags
> Delete order:  tags → comments → item → listing
> ```

---

## 7. Relations

### Load relations with joins
```typescript
// leftJoin — returns item even if relation is null
.leftJoinAndSelect('item.listing', 'listing')
.leftJoinAndSelect('item.comments', 'comments')
.leftJoinAndSelect('item.tags', 'tags')

// innerJoin — only returns item if relation exists
.innerJoinAndSelect('item.listing', 'listing')
```

### Filter on relation fields
```typescript
.leftJoinAndSelect('item.listing', 'listing')
.where('listing.rating > :rating', { rating: 3 })  // filter on relation
```

### ManyToMany — add and remove
```typescript
// add new tags
await entityManager
    .createQueryBuilder()
    .relation(Item, 'tags')
    .of(itemId)
    .add(newTagIds)

// remove old tags
await entityManager
    .createQueryBuilder()
    .relation(Item, 'tags')
    .of(itemId)
    .remove(oldTagIds)

// replace (remove old + add new in one call)
await entityManager
    .createQueryBuilder()
    .relation(Item, 'tags')
    .of(itemId)
    .addAndRemove(newTags, oldTags)
```

### OneToOne — set or unset
```typescript
// set relation
await entityManager
    .createQueryBuilder()
    .relation(Item, 'listing')
    .of(itemId)
    .set(listingId)

// unset relation (set to null)
await entityManager
    .createQueryBuilder()
    .relation(Item, 'listing')
    .of(itemId)
    .set(null)
```

---

## 8. Pagination

```typescript
async findAll(page: number = 1, limit: number = 10) {
    const [data, total] = await this.itemRepository
        .createQueryBuilder('item')
        .leftJoinAndSelect('item.listing', 'listing')
        .leftJoinAndSelect('item.comments', 'comments')
        .leftJoinAndSelect('item.tags', 'tags')
        .where('item.public = :public', { public: true })  // optional filter
        .orderBy('item.id', 'DESC')                        // optional sort
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount()

    return {
        data,
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit)
    }
}
```

---

## 9. Transactions with QueryBuilder

```typescript
await this.entityManager.transaction(async (entityManager) => {

    // always use the transaction's entityManager inside
    await entityManager
        .createQueryBuilder()
        .insert()
        .into(Item)
        .values({ name: 'Laptop' })
        .execute()

    await entityManager
        .createQueryBuilder()
        .insert()
        .into(Tag)
        .values({ content: 'electronics' })
        .execute()

    // if any operation fails → all rolled back automatically
})
```

> [!IMPORTANT]
> ### ⚠️ Always use the callback's `entityManager` inside transactions
>
> ```typescript
> // ❌ Wrong — uses global entityManager, outside the transaction
> await this.entityManager.transaction(async (entityManager) => {
>     await this.entityManager.createQueryBuilder()...  // not part of transaction!
> })
>
> // ✅ Correct — uses the transaction's entityManager
> await this.entityManager.transaction(async (entityManager) => {
>     await entityManager.createQueryBuilder()...  // part of transaction ✅
> })
> ```

---

## 10. Full CRUD Example

```typescript
@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly entityManager: EntityManager
    ) {}

    // CREATE
    async create(createItemDto: CreateItemDto) {
        await this.entityManager.transaction(async (entityManager) => {

            const listingResult = await entityManager
                .createQueryBuilder()
                .insert()
                .into(Listing)
                .values({ ...createItemDto.listing, rating: 0 })
                .execute()

            const listingId = listingResult.identifiers[0].id

            const itemResult = await entityManager
                .createQueryBuilder()
                .insert()
                .into(Item)
                .values({ ...createItemDto, listing: { id: listingId } })
                .execute()

            const itemId = itemResult.identifiers[0].id

            if (createItemDto.comments?.length) {
                await entityManager
                    .createQueryBuilder()
                    .insert()
                    .into(Comment)
                    .values(
                        createItemDto.comments.map((comment) => ({
                            ...comment,
                            item: { id: itemId }
                        }))
                    )
                    .execute()
            }

            if (createItemDto.tags?.length) {
                await entityManager
                    .createQueryBuilder()
                    .insert()
                    .into(Tag)
                    .values(createItemDto.tags)
                    .execute()
            }
        })
    }

    // READ ALL
    async findAll(page: number = 1, limit: number = 10) {
        const [data, total] = await this.itemRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.listing', 'listing')
            .leftJoinAndSelect('item.comments', 'comments')
            .leftJoinAndSelect('item.tags', 'tags')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount()

        return {
            data,
            total,
            page,
            limit,
            total_pages: Math.ceil(total / limit)
        }
    }

    // READ ONE
    findOne(id: number) {
        return this.itemRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.listing', 'listing')
            .leftJoinAndSelect('item.comments', 'comments')
            .leftJoinAndSelect('item.tags', 'tags')
            .where('item.id = :id', { id })
            .getOne()
    }

    // UPDATE
    async update(id: number, updateItemDto: UpdateItemDto) {
        await this.entityManager.transaction(async (entityManager) => {

            const item = await entityManager
                .createQueryBuilder(Item, 'item')
                .leftJoinAndSelect('item.listing', 'listing')
                .leftJoinAndSelect('item.comments', 'comments')
                .leftJoinAndSelect('item.tags', 'tags')
                .where('item.id = :id', { id })
                .getOne()

            if (!item) throw new NotFoundException(`Item #${id} not found`)

            const { listing, comments, tags, ...itemDto } = updateItemDto

            // update item fields
            await entityManager
                .createQueryBuilder()
                .update(Item)
                .set(itemDto)
                .where('id = :id', { id })
                .execute()

            // update listing if exists
            if (listing && item.listing) {
                await entityManager
                    .createQueryBuilder()
                    .update(Listing)
                    .set(listing)
                    .where('id = :id', { id: item.listing.id })
                    .execute()
            }

            // replace comments
            if (comments?.length) {
                await entityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Comment)
                    .where('itemId = :id', { id })
                    .execute()

                await entityManager
                    .createQueryBuilder()
                    .insert()
                    .into(Comment)
                    .values(comments.map((c) => ({ ...c, item: { id } })))
                    .execute()
            }

            // replace tags
            if (tags?.length) {
                await entityManager
                    .createQueryBuilder()
                    .relation(Item, 'tags')
                    .of(id)
                    .addAndRemove(tags.map((tag) => new Tag(tag)), item.tags)
            }
        })
    }

    // DELETE
    async remove(id: number) {
        await this.entityManager.transaction(async (entityManager) => {

            const item = await entityManager
                .createQueryBuilder(Item, 'item')
                .leftJoinAndSelect('item.listing', 'listing')
                .leftJoinAndSelect('item.tags', 'tags')
                .where('item.id = :id', { id })
                .getOne()

            if (!item) throw new NotFoundException(`Item #${id} not found`)

            // delete in correct order (children before parents)
            await entityManager
                .createQueryBuilder()
                .relation(Item, 'tags')
                .of(id)
                .remove(item.tags)

            await entityManager
                .createQueryBuilder()
                .delete()
                .from(Comment)
                .where('itemId = :id', { id })
                .execute()

            await entityManager
                .createQueryBuilder()
                .delete()
                .from(Item)
                .where('id = :id', { id })
                .execute()

            if (item.listing) {
                await entityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Listing)
                    .where('id = :id', { id: item.listing.id })
                    .execute()
            }
        })
    }
}
```

---

## 11. QueryBuilder vs Repository Methods

| Feature | Repository Methods | QueryBuilder |
|---|---|---|
| Simple CRUD | ✅ Best choice | ❌ Verbose |
| Complex conditions | ❌ Limited | ✅ Full control |
| Filter on relations | ❌ Not possible | ✅ Yes |
| Select specific columns | ❌ Limited | ✅ Yes |
| Bulk insert/update/delete | ❌ Slower | ✅ Faster |
| Joins | ❌ Via `relations` only | ✅ Full join control |
| Raw SQL expressions | ❌ No | ✅ Yes |
| Readability | ✅ Simple | ❌ More verbose |

---

## 12. Summary

| Method | QueryBuilder equivalent |
|---|---|
| `find()` | `.createQueryBuilder().getMany()` |
| `findOne()` | `.createQueryBuilder().where().getOne()` |
| `findAndCount()` | `.createQueryBuilder().getManyAndCount()` |
| `save()` | `.createQueryBuilder().insert().into().values().execute()` |
| `update()` | `.createQueryBuilder().update().set().where().execute()` |
| `delete()` | `.createQueryBuilder().delete().from().where().execute()` |

| QueryBuilder method | Purpose |
|---|---|
| `.where()` | Add a WHERE condition |
| `.andWhere()` | Add an AND condition |
| `.orWhere()` | Add an OR condition |
| `.leftJoinAndSelect()` | Join and load relation |
| `.innerJoinAndSelect()` | Join only if relation exists |
| `.orderBy()` | Sort results |
| `.groupBy()` | Group results |
| `.having()` | Filter on grouped results |
| `.skip()` | Offset for pagination |
| `.take()` | Limit for pagination |
| `.getOne()` | Return single entity |
| `.getMany()` | Return array of entities |
| `.getManyAndCount()` | Return array + total count |
| `.getRawOne()` | Return raw SQL result (single) |
| `.getRawMany()` | Return raw SQL results (array) |
| `.relation().addAndRemove()` | Update ManyToMany junction table |
| `.relation().set()` | Set or unset OneToOne relation |
