(1) create first middleware
-----------------------------
==> use (nest g mi [module_name]) (ex: nest g mi auth)
==> Note : if module_name already exist nest will create middleware in that module folder


    src/users/users.middleware.ts
    -------------------------------

    import { Injectable, NestMiddleware } from '@nestjs/common';
    import { Request, Response } from 'express';

    @Injectable()
    export class UsersMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: () => void) {
            console.log("Users Middleware")
            next();
        }
    }

(2) apply and usage of middleware
----------------------------------

    src/users/users.module.ts
    -------------------------------

    import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
    import { UsersMiddleware } from './users.middleware';

    @Module({})
    export class UsersModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            // can pass multiple middlewares here
            consumer.apply(UsersMiddleware).forRoutes('users')
        }
    }
