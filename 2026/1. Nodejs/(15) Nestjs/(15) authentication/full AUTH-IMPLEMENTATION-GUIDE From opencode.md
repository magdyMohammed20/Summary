# NestJS Auth with JWT — Implementation Guide

Detailed step-by-step implementation of a NestJS application with **User registration, login, logout, and global JWT authentication** using `@nestjs/jwt`, TypeORM, bcrypt, and cookie-based token storage.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Setup](#2-project-setup)
3. [Dependencies](#3-dependencies)
4. [Environment Variables](#4-environment-variables)
5. [Database Module](#5-database-module)
6. [User Entity & DTOs](#6-user-entity--dtos)
7. [Password Hashing](#7-password-hashing)
8. [User Service](#8-user-service)
9. [User Controller (register / login / logout)](#9-user-controller-register--login--logout)
10. [JWT Module (global)](#10-jwt-module-global)
11. [Public Decorator](#11-public-decorator)
12. [Global JWT Auth Guard](#12-global-jwt-auth-guard)
13. [Cookie-Parser & CORS](#13-cookie-parser--cors)
14. [Module Wiring](#14-module-wiring)
15. [Running & Testing](#15-running--testing)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Prerequisites

- Node.js 18+ (tested on v24)
- MySQL running locally on `localhost:3306`
- NestJS CLI: `npm i -g @nestjs/cli`

## 2. Project Setup

```bash
nest new nest-auth
cd nest-auth
```

## 3. Dependencies

```bash
# Config (load .env)
npm install @nestjs/config

# JWT
npm install @nestjs/jwt

# Password hashing
npm install bcrypt

# Cookie parsing (read jwt cookie on the server)
npm install cookie-parser
npm install -D @types/cookie-parser
```

## 4. Environment Variables

Create `.env` in the project root:

```env
# Database
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

# JWT
JWT_SECRET=nest-auth-secret
JWT_EXPIRES_IN=1h

# Server
PORT=3000
```

> `.env` must be added to `.gitignore`. If it was previously committed, untrack it with `git rm --cached .env`.

## 5. Database Module

The project uses a **manual TypeORM `DataSource`** provider (no `TypeOrmModule.forRoot`).

**`src/providers/database.providers.ts`**

```ts
import { User } from "src/resources/user/entities/user.entity";
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
        entities: [User],
        synchronize: true, // auto-create tables in dev
      });

      return dataSource.initialize();
    },
  },
];
```

**`src/providers/database.module.ts`**

```ts
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
```

## 6. User Entity & DTOs

**`src/resources/user/entities/user.entity.ts`**

```ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
```

**`src/resources/user/dto/create-user.dto.ts`**

```ts
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be a valid email address' })
  @MaxLength(150)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 100)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
    {
      message:
        'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}
```

> `class-validator` + `class-transformer` are installed with `nest new` scaffold. Validation is applied per-route with `@UsePipes(ValidationPipe)`.

## 7. Password Hashing

**`src/utils/hashing.ts`**

```ts
import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}
```

## 8. User Service

**`src/resources/user/user.service.ts`**

```ts
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/hashing';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    return this.userRepository
      .save({ ...data, password: hashPassword(data.password) })
      .catch((err) => {
        if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
          throw new ConflictException('Email already exists');
        }
        throw err;
      });
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // ... other CRUD methods
}
```

> **Note:** Because this project wires the repository manually (no `TypeOrmModule.forFeature`), `@InjectRepository(User)` must be backed by a manual provider in `UserModule` (see section 14).

## 9. User Controller (register / login / logout)

**`src/resources/user/user.controller.ts`**

```ts
import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UsePipes, ValidationPipe, BadRequestException, Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../decorators/public.decorator';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body('email') email: string,
    @Body('password') userPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(userPassword, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    const { password, ...result } = user;

    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'success',
      ...result,
    };
  }

  @Public()
  @Post('/logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict',
    });
    return { message: 'Logged out successfully' };
  }
}
```

## 10. JWT Module (global)

Register `JwtModule` **globally** in `AppModule` so `JwtService` is injectable anywhere (controller + guard).

```ts
JwtModule.registerAsync({
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): JwtModuleOptions => ({
    secret: configService.get<string>('JWT_SECRET')!,
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRES_IN') as NonNullable<
        JwtModuleOptions['signOptions']
      >['expiresIn'],
    },
  }),
}),
```

## 11. Public Decorator

**`src/decorators/public.decorator.ts`**

```ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

## 12. Global JWT Auth Guard

**`src/guards/jwt-auth.guard.ts`**

```ts
import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token =
      this.extractTokenFromHeader(request) ??
      this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return (request as any).cookies?.['jwt'];
  }
}
```

Register it as a **global guard** with `APP_GUARD`:

```ts
{
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
}
```

## 13. Cookie-Parser & CORS

**`src/main.ts`**

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## 14. Module Wiring

**`src/app.module.ts`**

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { DatabaseModule } from './providers/database.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') as NonNullable<
            JwtModuleOptions['signOptions']
          >['expiresIn'],
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
```

**`src/resources/user/user.module.ts`**

```ts
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
export class UserModule {}
```

> **Why the manual repository provider?** This project creates the DataSource manually (no `@nestjs/typeorm`'s `forRoot`). `@InjectRepository(User)` needs a provider under `getRepositoryToken(User)`, which is supplied here from the shared `DATA_SOURCE`.

## 15. Running & Testing

```bash
npm run start:dev
```

### Test the full auth flow

```bash
# 1. Register (public)
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"Password@123"}'
# -> 201

# 2. Login -> sets an httpOnly `jwt` cookie (public)
curl -c cookies.txt -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password@123"}'

# 3. Access a protected endpoint with the cookie
curl -b cookies.txt http://localhost:3000/user
# -> 200

# 4. Without cookie / token
curl http://localhost:3000/user
# -> 401 { "message": "Missing token" }

# 5. With an invalid token
curl http://localhost:3000/user -H "Authorization: Bearer not.a.jwt"
# -> 401 { "message": "Invalid token" }

# 6. Logout (public) -> clears the cookie
curl -b cookies.txt -c cookies.txt -X POST http://localhost:3000/user/logout
```

### Endpoint summary

| Method | Path            | Protected? | Description                    |
| ------ | --------------- | ---------- | ------------------------------ |
| POST   | `/user/register`| No (`@Public`) | Create user (password hashed) |
| POST   | `/user/login`   | No (`@Public`) | Verify credentials, set JWT cookie |
| POST   | `/user/logout`  | No (`@Public`) | Clear JWT cookie               |
| GET    | `/user`         | Yes        | List users                     |
| GET    | `/user/:id`     | Yes        | Get user by id                 |
| PATCH  | `/user/:id`     | Yes        | Update user                    |
| DELETE | `/user/:id`     | Yes        | Delete user                    |
| GET    | `/`             | Yes        | App root                       |

## 16. Troubleshooting

### 16.1 `MissingDriverError: Wrong driver: "undefined" given`

`.env` was not loaded, so `process.env.DB_TYPE` was `undefined`.
**Fix:** install `@nestjs/config` and add `ConfigModule.forRoot()` to `AppModule` imports.

### 16.2 `Nest can't resolve dependencies of the UserRepository (?)`

The service injects `@InjectRepository(User)` but no provider exists for that token.
**Fix:** add a manual provider using `getRepositoryToken(User)` backed by the shared `DATA_SOURCE` (see section 14).

### 16.3 `Nest can't resolve dependencies of the UserController (UserService, ?)` — `JwtService`

`JwtService` was injected but `JwtModule` was not registered.
**Fix:** register `JwtModule.registerAsync({ global: true, ... })` in `AppModule`.

### 16.4 `TypeError: Cannot read properties of undefined (reading 'role')` (or any undefined user)

A guard/middleware accessed `req.user` before authentication populated it.
**Fix:** always check for the token and the user before using it; throw `UnauthorizedException` instead of crashing.

### 16.5 Duplicate email returns 500

Registering an existing unique email throws a raw TypeORM `QueryFailedError` (`ER_DUP_ENTRY`).
**Fix:** catch `err.code === 'ER_DUP_ENTRY'` / `err.errno === 1062` and throw `ConflictException('Email already exists')` (409).

### 16.6 `tsBinary.getMutableClone is not a function`

NestJS CLI version is too old for the installed TypeScript version.
**Fix:** upgrade the CLI: `npm i -D @nestjs/cli@latest @nestjs/schematics@latest`.

### 16.7 `cookie-parser` TS error `This expression is not callable`

`@types/cookie-parser` uses `export =`, so with `esModuleInterop` use a default import:

```ts
import cookieParser from 'cookie-parser';
```

### 16.8 Login token missing from response body

The token is intentionally sent in an httpOnly cookie, not the body. Read it via `request.cookies['jwt']` (guard handles this automatically).
