(1) Apply validations of DTO
-----------------------------
==> class-validator: Provides decorators for validating DTOs.
==> class-transformer: Converts plain objects to instances of DTO classes.
==> install: npm install class-validator class-transformer

(2) steps to create validations
-------------------------------
==> Step 1: in dto file handle and set roles of required fields

    users/dto/create-user.dto.ts
    -------------------------------

    import { IsString, IsNotEmpty, Length } from 'class-validator';

    export class CreateUserDto {
        @IsString()
        @IsNotEmpty()
        @Length(3, 20)
        name: string;
    }

==> Step 2: handle pipe in controller

    users/controllers/users.controller.ts
    --------------------------------------

    import { Body, Post, UsePipes, ValidationPipe } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { CreateUserDto } from './dto/create-user.dto';

    // Add user
    @Post()
    @UsePipes(ValidationPipe)
    addUser(@Body() body: CreateUserDto): CreateUserDto[] {
        const newUser: CreateUserDto = body;
        return this.UsersService.addUser(newUser)
    }