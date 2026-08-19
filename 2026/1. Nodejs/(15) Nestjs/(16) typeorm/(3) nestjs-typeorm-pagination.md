# NestJS TypeORM Pagination

## Table of Contents
1. [Basic Pagination](#1-basic-pagination)
2. [Pagination with Total Count](#2-pagination-with-total-count-recommended)
3. [Summary](#3-summary)

---

## 1. Basic Pagination

### `items/items.service.ts`
```typescript
findAll(page: number = 1, limit: number = 10) {
    return this.itemRepository.find({
        relations: {
            listing: true,
            comments: true,
            tags: true
        },
        skip: (page - 1) * limit,  // how many records to skip
        take: limit                 // how many records to return
    })
}
```

### `items/items.controller.ts`
```typescript
@Get()
findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
) {
    return this.itemsService.findAll(+page, +limit)  // + converts string to number
}
```

### Usage
```
GET /items?page=1&limit=10
GET /items?page=2&limit=5
```

---

## 2. Pagination with Total Count ✅ Recommended

> Returns data + total count so the frontend knows how many pages exist.

### `items/items.service.ts`
```typescript
async findAll(page: number = 1, limit: number = 10) {
    const [data, total] = await this.itemRepository.findAndCount({
        relations: {
            listing: true,
            comments: true,
            tags: true
        },
        skip: (page - 1) * limit,
        take: limit
    })

    return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit)
    }
}
```

### `items/items.controller.ts`
```typescript
@Get()
findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
) {
    return this.itemsService.findAll(+page, +limit)
}
```

### Response
```json
{
    "data": [...],
    "total": 50,
    "page": 1,
    "lastPage": 5
}
```

---

## 3. Summary

| Term | Formula | Example (page=2, limit=10) |
|---|---|---|
| `skip` | `(page - 1) * limit` | `(2 - 1) * 10 = 10` |
| `take` | `limit` | `10` |
| `lastPage` | `Math.ceil(total / limit)` | `Math.ceil(50 / 10) = 5` |

| | `find()` | `findAndCount()` |
|---|---|---|
| Returns | data only | data + total count |
| DB queries | 1 | 2 (data + COUNT) |
| Use when | total pages not needed | building pagination UI |
