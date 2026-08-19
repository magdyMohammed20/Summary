# NestJS TypeORM Migrations

## Table of Contents
1. [What is a Migration?](#1-what-is-a-migration)
2. [Why Use Migrations?](#2-why-use-migrations)
3. [Setup](#3-setup)
4. [Migration Commands](#4-migration-commands)
5. [Migration File Structure](#5-migration-file-structure)
6. [Common Scenarios](#6-common-scenarios)
7. [Summary](#7-summary)

---

## 1. What is a Migration?

A **migration** is a file that describes a change to your database schema — like adding a column, creating a table, or dropping an index.

```
Migration File
──────────────
up()   → applies the change   (e.g. ADD COLUMN email)
down() → reverts the change   (e.g. DROP COLUMN email)
```

> Think of migrations like **git commits for your database schema**.

---

## 2. Why Use Migrations?

| | `synchronize: true` | Migrations |
|---|---|---|
| How it works | Auto-syncs schema on every app start | Explicit, controlled schema changes |
| Safe for production | ❌ Can drop columns/data | ✅ Safe, reversible |
| Team collaboration | ❌ Hard to track changes | ✅ Version-controlled files |
| Rollback support | ❌ No | ✅ Yes via `down()` |

> [!IMPORTANT]
> ### ⚠️ Never use `synchronize: true` in production
>
> It can **drop columns or tables** and cause **data loss** when your entities change.
>
> ```typescript
> // ❌ Dangerous in production
> TypeOrmModule.forRoot({
>     synchronize: true,  // drops and recreates tables on every restart!
> })
>
> // ✅ Safe in production
> TypeOrmModule.forRoot({
>     synchronize: false, // use migrations instead
> })
> ```

---

## 3. Setup

### Step 1 — Create `data-source.ts`

TypeORM CLI needs a standalone `DataSource` config to run migrations outside NestJS.

```typescript
// database/data-source.ts
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydb',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
})
```

### Step 2 — Add scripts to `package.json`

```json
{
    "scripts": {
        "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --dataSource src/database/data-source.ts",
        "migration:generate": "npm run typeorm -- migration:generate",
        "migration:create": "npm run typeorm -- migration:create",
        "migration:run": "npm run typeorm -- migration:run",
        "migration:revert": "npm run typeorm -- migration:revert",
        "migration:show": "npm run typeorm -- migration:show"
    }
}
```

### Step 3 — Disable `synchronize` in app module

```typescript
// app.module.ts
TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    synchronize: false, // 👈 must be false when using migrations
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsRun: true, // 👈 auto-run pending migrations on app start (optional)
})
```

---

## 4. Migration Commands

### Generate — auto-detects changes from your entities
```bash
npm run migration:generate src/migrations/AddEmailToUser
```
> Compares your entities to the current DB schema and generates the SQL automatically.

### Create — empty migration file
```bash
npm run migration:create src/migrations/AddEmailToUser
```
> Creates a blank migration file for you to write SQL manually.

### Run — apply all pending migrations
```bash
npm run migration:run
```

### Revert — undo the last applied migration
```bash
npm run migration:revert
```

### Show — list all migrations and their status
```bash
npm run migration:show
```

Output:
```
[X] 1700000000000-CreateItemsTable     ← applied
[X] 1700000000001-AddListingToItems    ← applied
[ ] 1700000000002-AddEmailToUser       ← pending
```

---

## 5. Migration File Structure

### Auto-generated example
```typescript
// src/migrations/1700000000000-AddEmailToUser.ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToUser1700000000000 implements MigrationInterface {

    // applies the migration
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`
        );
    }

    // reverts the migration
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`user\` DROP COLUMN \`email\``
        );
    }
}
```

> [!TIP]
> ### 💡 Always write `down()` properly
>
> The `down()` method should **perfectly undo** what `up()` did.
> If `up()` adds a column, `down()` should drop it.
> If `up()` creates a table, `down()` should drop the table.

---

## 6. Common Scenarios

### Add a column
```typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE \`items\` ADD \`slug\` varchar(255) NOT NULL`
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE \`items\` DROP COLUMN \`slug\``
    );
}
```

### Create a table
```typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`tag\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`content\` varchar(255) NOT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB
    `);
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`tag\``);
}
```

### Add an index
```typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `CREATE INDEX \`IDX_items_name\` ON \`items\` (\`name\`)`
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DROP INDEX \`IDX_items_name\` ON \`items\``
    );
}
```

### Rename a column
```typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE \`items\` CHANGE \`public\` \`isPublic\` tinyint NOT NULL DEFAULT 1`
    );
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `ALTER TABLE \`items\` CHANGE \`isPublic\` \`public\` tinyint NOT NULL DEFAULT 1`
    );
}
```

---

## 7. Summary

| Command | What it does |
|---|---|
| `migration:generate` | Auto-generates migration from entity changes |
| `migration:create` | Creates an empty migration file |
| `migration:run` | Applies all pending migrations |
| `migration:revert` | Reverts the last applied migration |
| `migration:show` | Shows all migrations and their status |

| Concept | Description |
|---|---|
| `up()` | Applies the schema change |
| `down()` | Reverts the schema change |
| `synchronize: false` | Required when using migrations in production |
| `migrationsRun: true` | Auto-runs pending migrations on app start |
| `data-source.ts` | Standalone config needed by TypeORM CLI |

> **Recommended workflow:**
> 1. Update your entity
> 2. Run `migration:generate` to create the migration file
> 3. Review the generated SQL
> 4. Run `migration:run` to apply it
> 5. Commit both the entity and migration file to git
