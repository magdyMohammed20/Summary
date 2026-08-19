# NestJS TypeORM Relations Guide

## Table of Contents
1. [One-to-One Relation](#1-one-to-one-relation)
2. [Abstract Entity](#2-abstract-entity)
3. [One-to-Many Relation](#3-one-to-many-relation)
4. [Many-to-Many Relation](#4-many-to-many-relation)

---

## 1. One-to-One Relation

> Example: `Item` has one `Listing`

### `items/entities/listing.entity.ts`
```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    rating: number;

    constructor(listing: Partial<Listing>) {
        Object.assign(this, listing);
    }
}
```

### `items/entities/item.entity.ts`
```typescript
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";

@Entity('items')
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    public: boolean

    // With cascade — saving item automatically saves listing too
    @OneToOne(() => Listing, { cascade: true })
    @JoinColumn()
    listing: Listing

    constructor(item: Partial<Item>) {
        Object.assign(this, item)
    }
}
```

### `items/dto/create-listing.dto.ts`
```typescript
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateListingDto {
    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    rating: number;
}
```

### `items/dto/update-listing.dto.ts`
```typescript
import { PartialType } from "@nestjs/mapped-types";
import { CreateListingDto } from "./create-listing.dto";

export class UpdateListingDto extends PartialType(CreateListingDto) { }
```

### `items/dto/create-item.dto.ts`
```typescript
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';

export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    public: boolean;

    @IsOptional()
    listing: CreateListingDto;
}
```

### `items/items.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, Listing]) // import Listing here
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule { }
```

### `items/items.service.ts`
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly entityManager: EntityManager) { }

    async create(createItemDto: CreateItemDto) {
        // handle add listing here
        const listing = new Listing({
            ...createItemDto.listing,
            rating: 0
        })
        const item = new Item({
            ...createItemDto,
            listing
        })
        await this.entityManager.save(item)
    }

    // handle to get listing here
    findAll() {
        return this.itemRepository.find({
            relations: { listing: true }
        })
    }

    // handle to get listing by id here
    findOne(id: number) {
        return this.itemRepository.findOne({
            where: { id },
            relations: { listing: true }
        })
    }

    // handle update listing here
    async update(id: number, updateItemDto: UpdateItemDto) {
        const item = await this.itemRepository.findOneBy({ id })

        if (!item) {
            throw new NotFoundException(`Item #${id} not found`);
        }

        const { listing, ...itemDto } = updateItemDto

        Object.assign(item, itemDto)

        if (listing) {
            item.listing = {
                ...item.listing,
                ...listing
            }
        }

        await this.entityManager.save(item)
    }

    remove(id: number) {
        return this.itemRepository.delete(id)
    }
}
```

---

## 2. Abstract Entity

> Reusable base entity to avoid repeating `id` and `constructor` in every entity.

### `database/abstract.entity.ts`
```typescript
import { PrimaryGeneratedColumn } from "typeorm";

export class AbstractEntity<T> {

    @PrimaryGeneratedColumn()
    id: number;

    constructor(entity?: Partial<T>) {
        Object.assign(this, entity);
    }
}
```

> After this, remove `id` and `constructor` from entities and extend `AbstractEntity` instead.

---

## 3. One-to-Many Relation

> Example: `Item` has many `Comments`

### Key Rules
| Decorator | `@JoinColumn()` |
|---|---|
| `@OneToOne` | ✅ Required (owning side) |
| `@ManyToOne` | ✅ Optional |
| `@OneToMany` | ❌ Never |

### `items/entities/comment.entity.ts`
```typescript
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {

    @Column()
    declare content: string;

    // foreign key (itemId) lives here in comments table
    @ManyToOne(() => Item, (item) => item.comments)
    declare item: Item;
}
```

### `items/entities/item.entity.ts`
```typescript
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";

@Entity('items')
export class Item extends AbstractEntity<Item> {

    @Column()
    declare name: string;

    @Column({ default: true })
    declare public: boolean

    @OneToOne(() => Listing, { cascade: true })
    @JoinColumn()
    declare listing: Listing

    @OneToMany(() => Comment, comment => comment.item, { cascade: true })
    // ❌ No @JoinColumn() here
    declare comments: Comment[]
}
```

### `items/dto/create-comment.dto.ts`
```typescript
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;
}
```

### `items/dto/create-item.dto.ts`
```typescript
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';
import { CreateCommentDto } from './create-comment.dto';

export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    public: boolean;

    @IsOptional()
    listing: CreateListingDto;

    @IsOptional()
    comments: CreateCommentDto[];
}
```

### `items/items.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, Listing, Comment]) // import Comment here
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule { }
```

### `items/items.service.ts`
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly entityManager: EntityManager) { }

    async create(createItemDto: CreateItemDto) {
        const listing = new Listing({
            ...createItemDto.listing,
            rating: 0
        })

        // handle add comments
        const comments = createItemDto.comments?.map(
            (comment) => new Comment({ ...comment })
        ) ?? []

        const item = new Item({
            ...createItemDto,
            listing,
            comments
        })

        await this.entityManager.save(item)
    }

    findAll() {
        return this.itemRepository.find({
            relations: { listing: true, comments: true }
        })
    }

    findOne(id: number) {
        return this.itemRepository.findOne({
            where: { id },
            relations: { listing: true, comments: true }
        })
    }

    async update(id: number, updateItemDto: UpdateItemDto) {
        const item = await this.itemRepository.findOneBy({ id })

        if (!item) {
            throw new NotFoundException(`Item #${id} not found`);
        }

        const { listing, ...itemDto } = updateItemDto

        // append comments in update
        const comments = updateItemDto.comments?.map(
            (createCommentDto) => new Comment(createCommentDto)
        ) ?? []

        Object.assign(item, itemDto)

        if (listing) {
            item.listing = {
                ...item.listing,
                ...listing
            }
        }

        item.comments = comments
        await this.entityManager.save(item)
    }

    remove(id: number) {
        return this.itemRepository.delete(id)
    }
}
```

---

## 4. Many-to-Many Relation

> Example: `Item` has many `Tags`, and `Tag` can belong to many `Items`

### Key Rules
- Use `@ManyToMany` on both sides
- Use `@JoinTable()` only on the **owning side** (Item)
- TypeORM creates a junction table automatically (`item_tags_tag`)

> [!IMPORTANT]
> ### 🗄️ Why are there 2 tables in the DB? (`tag` and `items_tags_tag`)
>
> This is **expected and correct** behavior with `@ManyToMany` in TypeORM.
>
> | Table | Purpose |
> |---|---|
> | `tag` | Stores the actual tag data (`id`, `content`) |
> | `items_tags_tag` | **Junction table** — links items and tags together |
>
> In relational databases, you can't store an array of IDs in a single column.
> So a **third table** is automatically created to hold the relationships:
>
> ```
> items_tags_tag
> -----------------
> itemsId | tagId
> 1       | 1
> 1       | 2
> 2       | 1
> ```
>
> This junction table is auto-generated by `@JoinTable()`.
> To customize its name, use:
>
> ```typescript
> @ManyToMany(() => Tag, { cascade: true })
> @JoinTable({
>   name: 'item_tags',              // 👈 custom name instead of items_tags_tag
>   joinColumn: { name: 'item_id' },
>   inverseJoinColumn: { name: 'tag_id' }
> })
> declare tags: Tag[]
> ```

### `items/entities/tag.entity.ts`
```typescript
import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Tag extends AbstractEntity<Tag> {

    @Column()
    declare content: string;
}
```

### `items/entities/item.entity.ts`
```typescript
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Tag } from "./tag.entity";

@Entity('items')
export class Item extends AbstractEntity<Item> {

    @Column()
    declare name: string;

    @Column({ default: true })
    declare public: boolean

    @OneToOne(() => Listing, { cascade: true })
    @JoinColumn()
    declare listing: Listing

    @OneToMany(() => Comment, comment => comment.item, { cascade: true })
    declare comments: Comment[]

    // add many to many relationship with tags
    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable() // ✅ only on owning side
    declare tags: Tag[]
}
```

### `items/dto/create-tag.dto.ts`
```typescript
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    content: string;
}
```

### `items/dto/create-item.dto.ts`
```typescript
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';
import { CreateCommentDto } from './create-comment.dto';
import { CreateTagDto } from './create-tag.dto';

export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    public: boolean;

    @IsOptional()
    listing: CreateListingDto;

    @IsOptional()
    comments: CreateCommentDto[];

    @IsOptional()
    tags: CreateTagDto[];
}
```

### `items/items.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, Listing, Comment, Tag]) // import Tag here
    ],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule { }
```

### `items/items.service.ts`
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
        private readonly entityManager: EntityManager) { }

    async create(createItemDto: CreateItemDto) {
        const listing = new Listing({
            ...createItemDto.listing,
            rating: 0
        })

        // handle add comments
        const comments = createItemDto.comments?.map(
            (comment) => new Comment({ ...comment })
        ) ?? []

        // handle add tags
        const tags = createItemDto.tags?.map(
            (tag) => new Tag(tag)
        ) ?? []

        const item = new Item({
            ...createItemDto,
            listing,
            comments,
            tags
        })

        await this.entityManager.save(item)
    }

    findAll() {
        return this.itemRepository.find({
            relations: {
                listing: true,
                comments: true,
                tags: true
            }
        })
    }

    findOne(id: number) {
        return this.itemRepository.findOne({
            where: { id },
            relations: {
                listing: true,
                comments: true,
                tags: true
            }
        })
    }

    async update(id: number, updateItemDto: UpdateItemDto) {
        const item = await this.itemRepository.findOneBy({ id })

        if (!item) {
            throw new NotFoundException(`Item #${id} not found`);
        }

        const { listing, ...itemDto } = updateItemDto

        const comments = updateItemDto.comments?.map(
            (createCommentDto) => new Comment(createCommentDto)
        ) ?? []

        const tags = updateItemDto.tags?.map(
            (createTagDto) => new Tag(createTagDto)
        ) ?? []

        Object.assign(item, itemDto)

        if (listing) {
            item.listing = {
                ...item.listing,
                ...listing
            }
        }

        item.comments = comments
        item.tags = tags // handle tags in update

        await this.entityManager.save(item)
    }

    remove(id: number) {
        return this.itemRepository.delete(id)
    }
}
```

---

## Summary

| Relation | Decorators | `@JoinColumn` | `@JoinTable` |
|---|---|---|---|
| One-to-One | `@OneToOne` on both | ✅ Owning side only | ❌ |
| One-to-Many | `@OneToMany` + `@ManyToOne` | ❌ on `@OneToMany` | ❌ |
| Many-to-Many | `@ManyToMany` on both | ❌ | ✅ Owning side only |

> `cascade: true` on the owning side means save/update/delete automatically propagates to related entities.
