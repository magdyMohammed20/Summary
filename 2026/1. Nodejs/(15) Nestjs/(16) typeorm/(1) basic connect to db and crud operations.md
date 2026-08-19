(1) create .env
-----------------

    .env
    -----

    MYSQL_ROOT_PASSWORD=root
    MYSQL_DATABASE=nestjs_typeorm
    MYSQL_USER=nestjs
    MYSQL_PASSWORD=nestjs
    MYSQL_PORT=3307
    MYSQL_HOST=localhost


(2) create 'docker-compose.yaml'
---------------------------------

    docker-compose.yaml
    --------------------

    services:
    mysql:
        image: mysql:latest
        environment:
        MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
        MYSQL_DATABASE: ${MYSQL_DATABASE}
        MYSQL_USER: ${MYSQL_USER}
        MYSQL_PASSWORD: ${MYSQL_PASSWORD}
        volumes:
        - mysql_data:/var/lib/mysql
        ports:
        - "${MYSQL_PORT}:3306"

    volumes:
    mysql_data:


(3) install type orm
--------------------
==> npm install @nestjs/typeorm typeorm mysql2 @nestjs/config


(3) install docker globally
---------------------------
==> brew install --cask docker-desktop


(4) open mysql workbench and create new connection with root/root and on same default port

(5) then run the docker: (docker compose up)

(6) start create database module
---------------------------------
==> nest g mo database
==> update .env with required database details

    database/database.module.ts
    ---------------------------

    import { Module } from '@nestjs/common';
    import { ConfigService } from '@nestjs/config';
    import { TypeOrmModule } from '@nestjs/typeorm';

    @Module({
        imports: [
            TypeOrmModule.forRootAsync({
                useFactory: (configService: ConfigService) => ({
                    type: 'mysql',
                    host: configService.get('MYSQL_HOST'),
                    port: configService.get('MYSQL_PORT'),
                    database: configService.get('MYSQL_DATABASE'),
                    username: configService.get('MYSQL_USERNAME'),
                    password: configService.get('MYSQL_PASSWORD'),
                    autoLoadEntities: true,
                    synchronize: true,
                })
            })
        ]
    })
    export class DatabaseModule { }


    .env
    -----

    MYSQL_ROOT_PASSWORD=root
    MYSQL_DATABASE=nestjs_typeorm
    MYSQL_USER=nestjs
    MYSQL_PASSWORD=nestjs
    MYSQL_PORT=3307
    MYSQL_HOST=localhost


(7) generates 'items' resource
-------------------------------
==> nest g res items
==> create Item Entity
==> imports Item Entity In items module
==> if go to mysql workbench and make 'refresh all' will note item table created

    items/entities/item.entity.ts
    -------------------------------

    import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

    @Entity('items')
    export class Item {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

        @Column({ default: true })
        public: boolean

        constructor(item: Partial<Item>) {
            Object.assign(this, item)
        }

    }



    items/items.module.ts
    ------------------------

    import { Module } from '@nestjs/common';
    import { ItemsService } from './items.service';
    import { ItemsController } from './items.controller';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Item } from './entities/item.entity';

    @Module({
        imports: [
            TypeOrmModule.forFeature([Item]) // import Item Entity here
        ],
        controllers: [ItemsController],
        providers: [ItemsService],
    })
    export class ItemsModule { }


(8) Install 'class-validator' and 'class-transformer' for dto validations
----------------------------------------------------------------------------
==> npm i class-validator class-transformer

    items/dto/create-item.dto.ts
    ----------------------------

    import {
        IsNotEmpty,
        IsOptional,
        IsString

    } from 'class-validator';

    export class CreateItemDto {

        @IsNotEmpty()
        @IsString()
        name: string;

        @IsOptional()
        public: boolean;
    }

(9) use dto in service and controller
---------------------------------------------------------------------------

    items/items.service.ts
    -------------------

    import { Injectable } from '@nestjs/common';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';
    import { Item } from './entities/item.entity';
    import { EntityManager } from 'typeorm';

    @Injectable()
    export class ItemsService {
        constructor(private readonly entityManager: EntityManager) { }
        async create(createItemDto: CreateItemDto) {
            const item = new Item(createItemDto)
            await this.entityManager.save(item)
        }
    }



    items/items.controller.ts
    -------------------


    import { Controller, Post, Body } from '@nestjs/common';
    import { ItemsService } from './items.service';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';

    @Controller('items')
    export class ItemsController {
        constructor(private readonly itemsService: ItemsService) { }

        @Post()
        create(@Body() createItemDto: CreateItemDto) {
            return this.itemsService.create(createItemDto);
        }

    }


(10) use repository to get all items or by id
--------------------------------------

    items/items.service.ts
    -------------------

    import { Injectable } from '@nestjs/common';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';
    import { Item } from './entities/item.entity';
    import { EntityManager, Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';

    @Injectable()
    export class ItemsService {
        constructor(
            // 1- inject the repository
            @InjectRepository(Item)
            private readonly itemRepository: Repository<Item>,
            private readonly entityManager: EntityManager) { }
        async create(createItemDto: CreateItemDto) {
            const item = new Item(createItemDto)
            await this.entityManager.save(item)
        }

        // 2- use the repository to get all items
        findAll() {
            return this.itemRepository.find()
        }

        // 3- use the repository to get one item by id
        findOne(id: number) {
            return this.itemRepository.findOneBy({ id })
        }
    }


    items/items.controller.ts
    -------------------

    import { Controller, Get, Post, Body, Param } from '@nestjs/common';
    import { ItemsService } from './items.service';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';

    @Controller('items')
    export class ItemsController {
        constructor(private readonly itemsService: ItemsService) { }

        @Post()
        create(@Body() createItemDto: CreateItemDto) {
            return this.itemsService.create(createItemDto);
        }

        @Get()
        findAll() {
            return this.itemsService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
            return this.itemsService.findOne(+id);
        }
    }

(11) update an Item
----------------------

    items/items.service.ts
    -------------------

    import { Injectable, NotFoundException } from '@nestjs/common';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';
    import { Item } from './entities/item.entity';
    import { EntityManager, Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';

    @Injectable()
    export class ItemsService {
        constructor(
            // 1- inject the repository
            @InjectRepository(Item)
            private readonly itemRepository: Repository<Item>,
            private readonly entityManager: EntityManager) { }
        async create(createItemDto: CreateItemDto) {
            const item = new Item(createItemDto)
            await this.entityManager.save(item)
        }

        // 2- use the repository to get all items
        findAll() {
            return this.itemRepository.find()
        }

        findOne(id: number) {
            return this.itemRepository.findOneBy({ id })
        }

        async update(id: number, updateItemDto: UpdateItemDto) {
            const item = await this.itemRepository.findOneBy({ id })

            if (!item) {
                throw new NotFoundException(`Item #${id} not found`);
            }

            Object.assign(item, updateItemDto)
            console.log(item)

            await this.entityManager.save(item)
        }
    }



    items/items.controller.ts
    -------------------

    import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
    import { ItemsService } from './items.service';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';

    @Controller('items')
    export class ItemsController {
        constructor(private readonly itemsService: ItemsService) { }

        @Post()
        create(@Body() createItemDto: CreateItemDto) {
            return this.itemsService.create(createItemDto);
        }

        @Get()
        findAll() {
            return this.itemsService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
            return this.itemsService.findOne(+id);
        }

        @Patch(':id')
        update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
            return this.itemsService.update(+id, updateItemDto);
        }

    }


(12) delete item by id
-------------------


    items/items.controller.ts
    -------------------

    import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
    import { ItemsService } from './items.service';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';

    @Controller('items')
    export class ItemsController {
        constructor(private readonly itemsService: ItemsService) { }

        @Post()
        create(@Body() createItemDto: CreateItemDto) {
            return this.itemsService.create(createItemDto);
        }

        @Get()
        findAll() {
            return this.itemsService.findAll();
        }

        @Get(':id')
        findOne(@Param('id') id: string) {
            return this.itemsService.findOne(+id);
        }

        @Patch(':id')
        update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
            return this.itemsService.update(+id, updateItemDto);
        }

        @Delete(':id')
        remove(@Param('id') id: string) {
            return this.itemsService.remove(+id);
        }
    }


    items/items.service.ts
    -------------------

    import { Injectable, NotFoundException } from '@nestjs/common';
    import { CreateItemDto } from './dto/create-item.dto';
    import { UpdateItemDto } from './dto/update-item.dto';
    import { Item } from './entities/item.entity';
    import { EntityManager, Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';

    @Injectable()
    export class ItemsService {
        constructor(
            // 1- inject the repository
            @InjectRepository(Item)
            private readonly itemRepository: Repository<Item>,
            private readonly entityManager: EntityManager) { }
        async create(createItemDto: CreateItemDto) {
            const item = new Item(createItemDto)
            await this.entityManager.save(item)
        }

        // 2- use the repository to get all items
        findAll() {
            return this.itemRepository.find()
        }

        findOne(id: number) {
            return this.itemRepository.findOneBy({ id })
        }

        async update(id: number, updateItemDto: UpdateItemDto) {
            const item = await this.itemRepository.findOneBy({ id })

            if (!item) {
                throw new NotFoundException(`Item #${id} not found`);
            }

            Object.assign(item, updateItemDto)
            console.log(item)

            await this.entityManager.save(item)
        }

        remove(id: number) {
            return this.itemRepository.delete(id)
        }
    }
