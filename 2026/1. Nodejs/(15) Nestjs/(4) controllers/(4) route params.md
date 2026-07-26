(1) route params
------------------
==> used instead of using express request to access parameters

    src/users/users.controller.ts
    -------------------------------

    import { Controller, Get, Param } from '@nestjs/common'; // 1- import Param
    @Controller('users')
    export class UsersController {

        private users: { id: number, name: string }[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe2' },
        ];

        // 2- handle route and route params
        @Get(':id')
        getUserById(@Param('id') id: string) { // //users/1
            return this.users.filter(user => user.id === +id);
        }


        ///////////////// another syntax ///////////////////////
         // 2- handle route and route params
        @Get(':id')
        getUserById(@Param() params: any) {
            return this.users.filter(user => user.id === +params.id);
        }
    }
