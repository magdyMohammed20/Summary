# NestJS TypeORM Subscribers

## Table of Contents
1. [What is a Subscriber?](#1-what-is-a-subscriber)
2. [Available Events](#2-available-events)
3. [Setup](#3-setup)
4. [Real Example — Item Subscriber](#4-real-example--item-subscriber)
5. [Practical Use Cases](#5-practical-use-cases)
6. [Summary](#6-summary)

---

## 1. What is a Subscriber?

A **subscriber** listens to entity lifecycle events and runs code **automatically** before or after a DB operation (insert, update, delete, etc.).

```
your code calls save()
        │
        ▼
   beforeInsert()    ← subscriber hook runs here
        │
        ▼
   DB INSERT happens
        │
        ▼
   afterInsert()     ← subscriber hook runs here
```

> Think of it like middleware, but for database operations.

---

## 2. Available Events

### Insert Events
| Event | When it runs |
|---|---|
| `beforeInsert` | Before a new record is inserted |
| `afterInsert` | After a new record is inserted |

### Update Events
| Event | When it runs |
|---|---|
| `beforeUpdate` | Before a record is updated |
| `afterUpdate` | After a record is updated |

### Remove Events
| Event | When it runs |
|---|---|
| `beforeRemove` | Before a record is deleted |
| `afterRemove` | After a record is deleted |

### Load Event
| Event | When it runs |
|---|---|
| `afterLoad` | After a record is loaded from DB |

### Transaction Events
| Event | When it runs |
|---|---|
| `beforeTransactionStart` | Before a transaction starts |
| `afterTransactionStart` | After a transaction starts |
| `beforeTransactionCommit` | Before a transaction is committed |
| `afterTransactionCommit` | After a transaction is committed |
| `beforeTransactionRollback` | Before a transaction is rolled back |
| `afterTransactionRollback` | After a transaction is rolled back |

---

## 3. Setup

### Step 1 — Create the subscriber file

```
items/
└── item.subscriber.ts
```

### Step 2 — Register in the module as a provider

```typescript
// items/items.module.ts
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemSubscriber } from './item.subscriber'; // 👈 import

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    controllers: [ItemsController],
    providers: [ItemsService, ItemSubscriber], // 👈 add here
})
export class ItemsModule { }
```

> [!IMPORTANT]
> ### ⚠️ Do NOT add `@Injectable()` to the subscriber
>
> TypeORM manages the subscriber lifecycle via `DataSource`, not NestJS DI.
> Adding `@Injectable()` will cause it to be instantiated twice and events will fire twice.
>
> ```typescript
> // ❌ Wrong
> @Injectable()
> @EventSubscriber()
> export class ItemSubscriber implements EntitySubscriberInterface<Item> {}
>
> // ✅ Correct
> @EventSubscriber()
> export class ItemSubscriber implements EntitySubscriberInterface<Item> {}
> ```

---

## 4. Real Example — Item Subscriber

### `items/item.subscriber.ts`
```typescript
import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
    RemoveEvent,
    LoadEvent
} from "typeorm";
import { Item } from "./entities/item.entity";
import { Logger } from "@nestjs/common";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {

    private readonly logger = new Logger(ItemSubscriber.name);

    constructor(dataSource: DataSource) {
        // register this subscriber with TypeORM
        dataSource.subscribers.push(this);
    }

    // tell TypeORM which entity this subscriber listens to
    listenTo() {
        return Item;
    }

    // --- Insert ---
    async beforeInsert(event: InsertEvent<Item>) {
        this.logger.log(`BEFORE INSERT: ${JSON.stringify(event.entity)}`);
    }

    async afterInsert(event: InsertEvent<Item>) {
        this.logger.log(`AFTER INSERT: item id=${event.entity.id}`);
    }

    // --- Update ---
    async beforeUpdate(event: UpdateEvent<Item>) {
        this.logger.log(`BEFORE UPDATE: item id=${event.entity?.id}`);
    }

    async afterUpdate(event: UpdateEvent<Item>) {
        this.logger.log(`AFTER UPDATE: item id=${event.entity?.id}`);
    }

    // --- Remove ---
    async beforeRemove(event: RemoveEvent<Item>) {
        this.logger.log(`BEFORE REMOVE: item id=${event.entityId}`);
    }

    async afterRemove(event: RemoveEvent<Item>) {
        this.logger.log(`AFTER REMOVE: item id=${event.entityId}`);
    }

    // --- Load ---
    async afterLoad(entity: Item) {
        this.logger.log(`AFTER LOAD: item id=${entity.id}`);
    }
}
```

---

## 5. Practical Use Cases

### Hash a password before insert
```typescript
async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
        event.entity.password = await bcrypt.hash(event.entity.password, 10)
    }
}
```

### Set a default value before insert
```typescript
async beforeInsert(event: InsertEvent<Item>) {
    if (!event.entity.slug) {
        event.entity.slug = slugify(event.entity.name)
    }
}
```

### Log who updated a record
```typescript
async afterUpdate(event: UpdateEvent<Item>) {
    this.logger.log(`Item ${event.entity?.id} was updated at ${new Date().toISOString()}`)
}
```

### Send a notification after insert
```typescript
async afterInsert(event: InsertEvent<Order>) {
    await this.notificationService.send(`New order #${event.entity.id} created`)
}
```

> [!TIP]
> ### 💡 `before` vs `after` — when to use which
>
> | Hook | Use for |
> |---|---|
> | `before` | **Modify** the entity before it hits the DB (hash password, set defaults, validate) |
> | `after` | **React** to what happened (send email, log, notify, trigger side effects) |

---

## 6. Summary

| Concept | Description |
|---|---|
| `@EventSubscriber()` | Marks the class as a TypeORM subscriber |
| `listenTo()` | Returns the entity this subscriber watches |
| `dataSource.subscribers.push(this)` | Registers the subscriber with TypeORM manually |
| `before*` hooks | Run before the DB operation — can modify the entity |
| `after*` hooks | Run after the DB operation — good for side effects |
| Register in module | Add to `providers[]` in the module — without `@Injectable()` |

> **Rule of thumb:** Use subscribers for cross-cutting concerns like logging, auditing, hashing, or sending notifications — keep this logic out of your service.
