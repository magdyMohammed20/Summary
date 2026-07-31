(1) setup env variable and jsonwebtoken
-----------------------------------------
==> npm install  jsonwebtoken 
==> npm i --save @nestjs/config // instead of dotenv
==> handle nestjs config in app.module.ts
==> then create '.env' in root folder
==> then add .env in .gitignore
==> then handle the auth middleware for validate and access the token then append user data in the request to pass to the auth guard
==> in auth guard access the user data from the request and check if the user is exist or not
==> and finally add AuthGuard on users controller

    .env
    ------

    JWT_SECRET="MAGDY_JWT_SECRET"


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
    import { ConfigModule } from '@nestjs/config'; // import

    @Module({
        imports: [ProductsModule, UsersModule, ConfigModule.forRoot()], // pass
        controllers: [AppController, UsersController],
        providers: [AppService, UsersService],
        exports: [],
    })
    export class AppModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer.apply(AuthMiddleware).forRoutes('*');
        }
    }


    middlewares/auth.middleware.ts
    --------------------------------

    import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
    import { Request, Response, NextFunction } from "express";
    import jwt from "jsonwebtoken";

    @Injectable()
    export class AuthMiddleware implements NestMiddleware {
        use(req: Request, res: Response, next: NextFunction) {
            // 1- access the auth token from header
            const authHeader = req.headers.authorization;

            // 2- check if the token is exist
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Missing or malformed Authorization header',
                });
            }

            const token = authHeader.slice(7).trim(); // strip "Bearer "

            try {
                // if jwt can verify the token, then the user is authenticated
                const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
                console.log(decoded)

                // add the decoded data to request for passing to guard
                req['user'] = decoded;
                next(); // only reached on success
            } catch (err) {
                // if jwt can't verify the token, then the user is not authenticated
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    message: 'invalid token',
                });
            }
        }
    }


    guards/auth/auth.guard.ts
    ----------------------------

    import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
    import { Observable } from 'rxjs';

    @Injectable()
    export class AuthGuard implements CanActivate {
        canActivate(
            context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
            const req = context.switchToHttp().getRequest();

            console.log('From Guard', req.user)

            return req.user
        }
    }


    users.controller.ts
    ---------------------

    import { AuthGuard } from '../guards/auth/auth.guard';

    @Controller('users')
    @UseGuards(AuthGuard)
    export class UsersController {
        // ..
    }