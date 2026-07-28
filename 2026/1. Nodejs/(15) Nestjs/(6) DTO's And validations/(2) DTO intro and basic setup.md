(1) DTO
----------
==> A DTO (Data Transfer Object) is an object that defines how data will be sent over the network. It acts as a contract between the client and the server, ensuring that only the necessary data is transmitted and validated.

(2) Why Use DTOs?
-------------------
==> Data Validation: Ensure incoming data matches the expected format.
==> Type Safety: Leverage TypeScript to enforce data types.
==> Decoupling: Separate data structure from business logic.
==> Documentation: Clearly define the shape of data for APIs.

(3) create first dto
----------------------
==> inside the module folder 'users' , 'products' , ... create a file and it's name depends on the case 'create-user.dto.ts' , 'update-user.dto.ts'
==> the file will contains types and required data for the case


    src/users/dto/create-user.dto.ts
    ----------------------------------

    export interface CreateUserDto {
        id?: number,
        name: string
    }

    src/users/users.controller.ts
    ----------------------------------

    import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
    import type { CreateUserDto } from './dto/create-user.dto';


    // Add user
    // mark body here with CreateUserDto
    @Post()
    addUser(@Body() body: CreateUserDto): CreateUserDto[] {
        const newUser: User = body;
        return this.UsersService.addUser(newUser)
    }


    src/users/users.service.ts
    ----------------------------------

    import type { CreateUserDto } from './dto/create-user.dto';

    addUser(user: CreateUserDto): CreateUserDto[] {
        this.users.push({ id: this.users.length + 1, ...user });
        return this.users
    }