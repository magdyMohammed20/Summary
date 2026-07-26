(1) request params in controller routes
-----------------------------------------

    src/users/users.controller.ts
    -------------------------------

    import { Controller, Get, Req } from '@nestjs/common'; // 1- import Req
    import type { Request } from 'express'; // 2- import Request as Type

    @Controller('users')
    export class UsersController {

        private users: { id: number, name: string }[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ];


        @Get()
        getUsers() {
            return this.users;
        }

        // 3- handle route and request params
        @Get(':id')
        getUserById(@Req() request: Request) {
            return this.users.filter(user => user.id === +request.params.id);
        }
    }




