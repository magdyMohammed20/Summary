(0) A Repository in NestJS(usually via TypeORM or a custom pattern) 
---------------------------
==> is the layer responsible for talking directly to the database — it abstracts away raw queries so your service layer doesn't need to know SQL, connection details, or ORM internals.

==> Where it sits in your app's architecture

    - Controller → Service → Repository → Database

        - Controller — handles HTTP request / response, no business logic
        - Service — business logic(validation rules, orchestration, calling multiple repositories)
        - Repository — the only layer that actually queries the database
        - Database — where data lives

        
==> What it actually does
    
    - A repository wraps common data - access operations(find, save, update, delete, custom queries) 
      so the rest of your app interacts with clean method calls instead of SQL strings.



(1) npm install --save typeorm mysql2
    npm i bcrypt
    npm i - D @types/bcrypt

(1.1) handle .env
------------------------------
==> npm install @nestjs/config

    .env
    -----------------

    DB_TYPE = mysql
    DB_HOST = localhost
    DB_PORT = 3306
    DB_USERNAME = root
    DB_PASSWORD = @Bfci5555 @
    DB_DATABASE = first_nest_db

    JWT_SECRET = "nest-auth-secret"
    JWT_EXPIRES_IN = 1h


(2) handle database provider
-------------------------------

    providers/database.providers.ts
    ---------------------------------

    import { User } from "src/entities/user.entity";
    import { DataSource } from "typeorm";

    export const databaseProviders = [
        {
            provide: 'DATA_SOURCE',
            useFactory: async () => {
                const dataSource = new DataSource({
                    type: process.env.DB_TYPE as any,
                    host: process.env.DB_HOST,
                    port: +(process.env.DB_PORT ?? 3306),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    entities: [
                        User
                    ],
                    synchronize: true,
                });

                return dataSource.initialize();
            },
        }

    ]

    providers/database.module.ts
    ---------------------------------

        import { Module } from '@nestjs/common';
        import { databaseProviders } from './database.providers';

        @Module({
            providers: [...databaseProviders],
            exports: [...databaseProviders],
        })
        export class DatabaseModule { }


    resources/user/user.module.ts
    --------------------------------

    import { Module } from '@nestjs/common';
    import { getRepositoryToken } from '@nestjs/typeorm';
    import { DatabaseModule } from '../../providers/database.module';
    import { UserService } from './user.service';
    import { UserController } from './user.controller';
    import { User } from './entities/user.entity';

    @Module({
        imports: [DatabaseModule],
        controllers: [UserController],
        providers: [
            UserService,
            {
                provide: getRepositoryToken(User),
                useFactory: (dataSource) => dataSource.getRepository(User),
                inject: ['DATA_SOURCE'],
            },
        ],
    })
    export class UserModule { }



    app.module.ts
    -----------------

    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { DatabaseModule } from './providers/database.module';
    import { UserModule } from './resources/user/user.module';

    @Module({
        imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
        controllers: [AppController],
        providers: [AppService],
    })
    export class AppModule { }



(3) create user entity for create the database table then import in the provider above
----------------------------------------------------------------------------------------

    entities/user.entity.ts
    -----------------------------

    import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";


    @Entity('users')
    export class User {
        @PrimaryGeneratedColumn()

        id: number;

        @Column()
        name: string;

        @Column({ unique: true })
        email: string;

        @Column()
        password: string;
    }


(4) handle user controller register method to save the user data in the database
-----------------------------------------------------------------------------------

    resources/user/user.controller.ts
    --------------------------------------

    import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
    import { UserService } from './user.service';
    import { CreateUserDto } from './dto/create-user.dto';

    @Controller('user')
    export class UserController {
        constructor(private readonly userService: UserService) { }

        @Post('/register')
        @UsePipes(ValidationPipe)
        register(@Body() createUserDto: CreateUserDto) {
            return this.userService.create(createUserDto);
        }
    }

(5) handle user service to save the user data in the database
-----------------------------------------------------------------------------------

    resources/user/user.service.ts
    --------------------------------------

    import { ConflictException, Injectable } from '@nestjs/common';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { User } from './entities/user.entity';
    import { Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';

    @Injectable()
    export class UserService {

        constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

        }
        create(data: CreateUserDto) {
            return this.userRepository.save(data).catch((err) => {
                if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                    throw new ConflictException('Email already exists');
                }
                throw err;
            });
        }
    }

(6) handle bcrypt to hash the password before saving it in the database
-----------------------------------------------------------------------------------
==> npm i bcrypt
==> npm i - D @types/bcrypt


    utils/hashing.ts
    -----------------------------

    import * as bcrypt from 'bcrypt';

    export const hashPassword = (password: string): string => {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    }

    resources/user/user.service.ts
    --------------------------------------

    import { ConflictException, Injectable } from '@nestjs/common';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { User } from './entities/user.entity';
    import { Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';
    import { hashPassword } from 'src/utils/hashing';


    @Injectable()
    export class UserService {

        constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

        }
        async create(data: CreateUserDto) {

            return this.userRepository.save({ ...data, password: hashPassword(data.password) }).catch((err) => {
                if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                    throw new ConflictException('Email already exists');
                }
                throw err;
            });
        }
    }

(7) handle login
--------------------------------

    resources/user/user.controller.ts
    --------------------------------------

    import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
    import { UserService } from './user.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import * as bcrypt from 'bcrypt';

    @Controller('user')
    export class UserController {
        constructor(private readonly userService: UserService) { }

        @Post('/register')
        @UsePipes(ValidationPipe)
        register(@Body() createUserDto: CreateUserDto) {
            return this.userService.create(createUserDto);
        }

        @Post('/login')
        @UsePipes(ValidationPipe)
        async login(@Body('email') email: string, @Body('password') userPassword: string) {
            const user = await this.userService.findOne(email);

            if (!user) {
                throw new BadRequestException('invalid credentials');
            }

            if (!await bcrypt.compare(userPassword, user.password)) {
                throw new BadRequestException('invalid credentials');
            }

            const { password, ...result } = user;
            return result;
        }
    }


    resources/user/user.service.ts
    --------------------------------------

    import { ConflictException, Injectable } from '@nestjs/common';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import { User } from './entities/user.entity';
    import { Repository } from 'typeorm';
    import { InjectRepository } from '@nestjs/typeorm';
    import { hashPassword } from 'src/utils/hashing';


    @Injectable()
    export class UserService {

        constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

        }
        async create(data: CreateUserDto) {

            return this.userRepository.save({ ...data, password: hashPassword(data.password) }).catch((err) => {
                if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
                    throw new ConflictException('Email already exists');
                }
                throw err;
            });
        }

        findOne(email: string) {
            return this.userRepository.findOne({ where: { email } });
        }

    }


(8) use jwt
-------------
==> npm install --save @nestjs/jwt


    resources/user/user.controller.ts
    --------------------------------------

    import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, BadRequestException, Res } from '@nestjs/common';
    import { UserService } from './user.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';
    import * as bcrypt from 'bcrypt';
    import { JwtService } from '@nestjs/jwt';
    import type { Response } from 'express';

    @Controller('user')
    export class UserController {
        constructor(private readonly userService: UserService, private jwtService: JwtService) { }

        @Post('/register')
        @UsePipes(ValidationPipe)
        register(@Body() createUserDto: CreateUserDto) {
            return this.userService.create(createUserDto);
        }

        @Post('/login')
        @UsePipes(ValidationPipe)
        async login(@Body('email') email: string, @Body('password') userPassword: string,
            @Res({ passthrough: true }) response: Response) {
            const user = await this.userService.findOne(email);

            if (!user) {
                throw new BadRequestException('invalid credentials');
            }

            if (!await bcrypt.compare(userPassword, user.password)) {
                throw new BadRequestException('invalid credentials');
            }

            const jwt = await this.jwtService.signAsync({ id: user.id })
            const { password, ...result } = user;

            const formattedResponse = {
                ...result,
                //token: jwt
            }

            // here we send jwt in the cookies not in the body
            response.cookie('jwt', jwt, { httpOnly: true });
            return {
                message: "success",
                ...formattedResponse
            };
        }
    }



    resources/user/User.module.ts
    --------------------------------------

    import { Module } from '@nestjs/common';
    import { ConfigModule, ConfigService } from '@nestjs/config';
    import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
    import { getRepositoryToken } from '@nestjs/typeorm';
    import { DatabaseModule } from '../../providers/database.module';
    import { UserService } from './user.service';
    import { UserController } from './user.controller';
    import { User } from './entities/user.entity';

    @Module({
        imports: [
            DatabaseModule,
            // here
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService): JwtModuleOptions => ({
                    secret: configService.get <string> ('JWT_SECRET')!,
                    signOptions: {
                        expiresIn: configService.get <string> ('JWT_EXPIRES_IN') as NonNullable<JwtModuleOptions['signOptions']>['expiresIn'],
                    },
                }),
            }),
        ],
        controllers: [UserController],
        providers: [
            UserService,
            {
                provide: getRepositoryToken(User),
                useFactory: (dataSource) => dataSource.getRepository(User),
                inject: ['DATA_SOURCE'],
            },
        ],
    })
    export class UserModule { }


    main.ts
    --------------------------------------

    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';

    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        // add this as we send the jwt in the token
        app.enableCors({
            origin: '*', // or specify like http://localhost:8080
            credentials: true,
        })
        await app.listen(process.env.PORT ?? 3000);
    }
    bootstrap();


