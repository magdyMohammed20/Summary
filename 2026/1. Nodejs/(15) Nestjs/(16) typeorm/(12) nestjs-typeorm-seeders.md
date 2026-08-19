# Seeders — Setup & Usage Guide

---

## 1. Install dependencies

```bash
npm install -D ts-node tsconfig-paths typeorm-extension
```

## 2. Folder structure

```
src/database/
├── data-source.ts          # shared DataSource config (used by seeder + migrations)
└── seeders/
    └── seed.ts             # the main seeder script
```

## 3. `src/database/data-source.ts`

```typescript
import 'dotenv/config';                    // ← MUST be first (import-order bug)
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT || 3307),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
}

export default new DataSource(options);
```

> **Import-order gotcha:** `import dataSource from '../data-source'` in the seeder is hoisted above any `dotenv.config()` call — so `data-source.ts` must load `.env` itself (`import 'dotenv/config'` or `dotenv.config()`), otherwise the connection uses `user: ''`.

## 4. Seed script (`src/database/seeders/seed.ts`)

```typescript
import { DataSource } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Listing } from '../../items/entities/listing.entity';
import { Comment } from '../../items/entities/comment.entity';
import { Tag } from '../../items/entities/tag.entity';
import dataSource from '../data-source';

async function truncate() {
    const tables = ['items_tags_tag', 'items', 'tag', 'listing', 'comment'];
    for (const table of tables) {
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0`);
        await dataSource.query(`TRUNCATE TABLE \`${table}\``);
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1`);
    }
    console.log('-- tables truncated');
}

async function seed() {
    await dataSource.initialize();
    await truncate();

    const item1 = new Item({
        name: 'Vintage Jacket',
        public: true,
        listing: new Listing({ description: 'Classic leather jacket', rating: 4 }),
        comments: [
            new Comment({ content: 'First comment' }),
            new Comment({ content: 'Second comment' }),
        ],
        tags: [new Tag({ content: 'fashion' }), new Tag({ content: 'sale' })],
    });
    await dataSource.manager.save(item1);

    const item2 = new Item({
        name: 'Mechanical Keyboard',
        public: true,
        listing: new Listing({ description: 'Cherry MX brown switches', rating: 5 }),
        comments: [new Comment({ content: 'Great for typing' })],
        tags: [new Tag({ content: 'tech' })],
    });
    await dataSource.manager.save(item2);

    const item3 = new Item({
        name: 'Desk Lamp',
        public: false,
        listing: new Listing({ description: 'LED adjustable', rating: 3 }),
        comments: [],
        tags: [],
    });
    await dataSource.manager.save(item3);

    const counts = {
        items: await dataSource.manager.count(Item),
        listings: await dataSource.manager.count(Listing),
        comments: await dataSource.manager.count(Comment),
        tags: await dataSource.manager.count(Tag),
    };
    console.log('-- seeding complete:', counts);

    await dataSource.destroy();
}

seed()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Seed failed:', error);
        process.exit(1);
    });
```

## 5. npm script (`package.json`)

```json
"seed": "ts-node -r tsconfig-paths/register src/database/seeders/seed.ts"
```

## 6. Run it

```bash
npm run seed
```

## 7. Verify

```bash
docker compose exec mysql mysql -unestjs -pnestjs nestjs_typeorm -e "SELECT COUNT(*) FROM items; SELECT COUNT(*) FROM tag;"
```

---

## Re-seeding / clean runs

**A. Truncate-first** (as in the script above) — wipes rows, keeps schema.

**B. Nuclear wipe** — data + schema:
```bash
docker compose down -v
docker compose up -d
npm run migration:run    # recreate schema
npm run seed
```

---

## Optional: seed via migration (for reference data)

```bash
npm run typeorm -- migration:create src/database/migrations/SeedInitialData
```

Put `INSERT` statements inside the migration's `up()` and run `npm run migration:run`. Runs automatically everywhere (CI, teammates, fresh DBs).

---

## Best practices

- **Fake/dev data** → `seed.ts`; **reference data** (statuses, roles) → migrations.
- Never run `npm run seed` against production.
- Make seeders idempotent or truncate-first (as above).
- Keep `seed` script obvious in `package.json`.

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `Access denied for user ''@'...' (using password: NO)` | `.env` loaded after DataSource created | `import 'dotenv/config'` at top of `data-source.ts` |
| `Cannot find module 'src/database/abstract.entity'` | Path alias not resolved | Run with `-r tsconfig-paths/register` |
| Entity fields all insert `DEFAULT` | Fields missing `declare` (ES2023 class fields) | Add `declare` to every entity field |
| FK constraint fails on truncate | Truncating parent tables | Use `SET FOREIGN_KEY_CHECKS = 0/1` around truncates |