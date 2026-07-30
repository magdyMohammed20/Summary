(1) Global Middleware for check if user is authenticated or not
---------------------------------------------------------------------

    src/users/middlewares/auth.middleware.ts
    ------------------------------------------

    import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
    import { Request, Response } from "express";

    @Injectable()
    export class AuthMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: () => void) {
            if (!req.headers.authorization) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: "Unauthorized"
                })
            }
            next();
        }
    }


    app.module.ts
    ---------------

    import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { UsersController } from './users/users.controller';
    import { UsersService } from './users/users.service';
    import { ProductsModule } from './products/products.module';
    import { UsersModule } from './users/users.module';
    import { AuthMiddleware } from './users/middlewares/auth.middleware';


    @Module({
        imports: [ProductsModule, UsersModule],
        controllers: [AppController, UsersController],
        providers: [AppService, UsersService],
        exports: [],
    })
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer.apply(AuthMiddleware).forRoutes('*');
        }
    }
