(1) generate controller shortcut 
---------------------------------
==> nest g co [name] (ex: nest g co users) // by default it will create a controller and a import it in app.module.ts

    src/users/users.controller.ts
    ----------------------------------

    import { Controller, Get } from '@nestjs/common';

    @Controller('users')
    export class UsersController {
        @Get()
        getUsers() { // /users
            return [{ id: 1, name: 'John Doe1' }, { id: 2, name: 'Jane Doe2' }];
        }
    }


    src/app.module.ts
    ----------------------------------

    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { UsersController } from './users/users.controller';


    @Module({
        imports: [],
        controllers: [AppController, UsersController],
        providers: [AppService],
        exports: [],
    })
    export class AppModule { }

