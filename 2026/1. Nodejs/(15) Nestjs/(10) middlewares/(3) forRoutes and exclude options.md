(1) middleware forRoutes() options
-----------------------------------
==> string option : Passing the route that we need the middleware to work on it (EX: .forRoutes("/users"))
==> Route Info : Can pass object that contains that route path and http method

    src/users/users.module.ts
    ------------------------------

    import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
    import { UsersMiddleware } from './users.middleware';

    @Module({})
    export class UsersModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {

            // Here with specify the '/users' endpoint with method get to apply the middleware on it
            consumer.apply(UsersMiddleware).forRoutes({
                method: RequestMethod.GET,
                path:'/users'
            })
        }
    }

(2) middleware exclude
-----------------------
==> if we need to exclude specific route or specific endpoint to prevent middleware works with it 
==> For Make exclude works must use forRoutes() with it

    src/users/users.module.ts
    ------------------------------
    
    import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
    import { UsersMiddleware } from './users.middleware';

    @Module({})
    export class UsersModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {

            // prevent middleware to work on /users/2 endpoint with GET action
            // and with /users/2 DELETE actions
            consumer.apply(UsersMiddleware).exclude({
                method: RequestMethod.GET,
                path: 'users/:id'
            }, {
                path: "users/:id",
                method: RequestMethod.DELETE
            }).forRoutes('users')
        }
    }

