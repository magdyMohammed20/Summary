(1) Post And Delete requests
------------------------------

    src/users/user.controller.ts
    -------------------------------

    import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
    import type { Request } from 'express';

    interface User {
        id?: number,
        name: string
    }

    @Controller('users')
    export class UsersController {

        private users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe2' },
        ];

        // Get all users
        @Get()
        getUsers() {
            return this.users;
        }

        // Get user by id
        @Get(':id')
        getUserById(@Param() params: any) {
            return this.users.filter(user => user.id === +params.id);
        }

        // Add user
        @Post()
        addUser(@Req() req: Request) {
            const newUser: User = req.body;
            console.log(newUser);
            this.users.push({ id: this.users.length + 1, ...newUser });
            return this.users;
        }

        // Remove user
        @Delete(':id')
        removeUser(@Param('id') id: string) {
            this.users = this.users.filter(user => user.id !== +id);

            return this.users;
        }
    }
