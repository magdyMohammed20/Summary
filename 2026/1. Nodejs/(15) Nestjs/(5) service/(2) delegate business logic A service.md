(1) refactor the user controller to use the service
-----------------------------------------------------

    src/users/users.service.ts
    --------------------------------

    import { Injectable } from '@nestjs/common';
    import { User } from 'src/interfaces/user';

    @Injectable()
    export class UsersService {
        private users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe2' },
        ];


        getUsers(): User[] {
            return this.users;
        }

        getUserById(id: string): User | undefined {
            return this.users.find(user => user.id === +id);
        }

        addUser(user): User[] {
            this.users.push({ id: this.users.length + 1, ...user });
            return this.users
        }

        removeUser(id): User[] {
            this.users = this.users.filter(user => user.id !== +id);
            return this.users
        }

        updateUser(id: String, body: User): User | String {
            const idx = this.users.findIndex(user => user.id === +id)

            if (idx !== -1) {
                this.users[idx] = { ...this.users[idx], ...body }
                return this.users[idx]
            }
            return "User Not Found"
        }
    }

    src/users/users.controller.ts
    --------------------------------

    import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
    import type { Request } from 'express';
    import type { User } from 'src/interfaces/user';
    import { UsersService } from './users.service';

    @Controller('users')
    export class UsersController {

        constructor(private readonly UsersService: UsersService) { }

        // Get all users
        @Get()
        getUsers() {
            return this.UsersService.getUsers();
        }

        // Get user by id
        @Get(':id')
        getUserById(@Param() params: any): User[] | [] {
            return this.UsersService.getUsers().filter(user => user.id === +params.id);
        }

        // Add user
        @Post()
        addUser(@Req() req: Request): User[] {
            const newUser: User = req.body;
            this.UsersService.getUsers().push({ id: this.UsersService.getUsers().length + 1, ...newUser });
            return this.UsersService.getUsers();
        }

        // Remove user
        @Delete(':id')
        removeUser(@Param('id') id: string): User[] {
            let users = this.UsersService.getUsers()
            users = users.filter(user => user.id !== +id);

            return users
        }

        // Update user
        @Put(':id')
        updateUser(@Param('id') id: String, @Body() body: User): User | String {
            const idx = this.UsersService.getUsers().findIndex(user => user.id === +id)

            if (idx !== -1) {
                this.UsersService.getUsers()[idx] = { ...this.UsersService.getUsers()[idx], ...body }
                return this.UsersService.getUsers()[idx]
            }
            return "User Not Found"
        }
    }
