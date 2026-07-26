(1) PUT Request
-----------------

    src/users/users.controller.ts
    --------------------------------

    import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
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
        getUserById(@Param() params: any): User[] | [] {
            return this.users.filter(user => user.id === +params.id);
        }

        // Add user
        @Post()
        addUser(@Req() req: Request): User[] {
            const newUser: User = req.body;
            this.users.push({ id: this.users.length + 1, ...newUser });
            return this.users;
        }

        // Remove user
        @Delete(':id')
        removeUser(@Param('id') id: string): User[] {
            this.users = this.users.filter(user => user.id !== +id);

            return this.users;
        }

        // Update user
        @Put(':id')
        updateUser(@Param('id') id: String, @Body() body: User): User | String {
            const idx = this.users.findIndex(user => user.id === +id)

            if (idx !== -1) {
                this.users[idx] = { ...this.users[idx], ...body }
                return this.users[idx]
            }
            return "User Not Found"
        }
    }
