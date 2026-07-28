(1) Handle DTO For Update Data
-------------------------------
==> Step 1: npm install @nestjs/mapped-types

==> Step 2: Create DTO For Update Data

    src/users/dto/update-user.dto.ts
    ----------------------------------

    import { PartialType } from '@nestjs/mapped-types';
    import { CreateUserDto } from './create-user.dto';

    // The Class extends the createUserDto class and uses the PartialType decorator to make all properties optional.
    export class UpdateUserDto extends PartialType(CreateUserDto) {}

==> Step 3: Update Controller

    src/users/users.controller.ts
    ----------------------------

    // Update user
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): CreateUserDto | String {
        return this.UsersService.updateUser(id, body)
    }

==> Step 4: Update Service

    src/users/users.service.ts
    --------------------------

    import { UpdateUserDto } from './dto/update-user.dto';
    import { CreateUserDto } from './dto/create-user.dto';

    updateUser(id: number, body: UpdateUserDto): CreateUserDto | String {
        const idx = this.users.findIndex(user => user.id === +id)

        if (idx !== -1) {
            this.users[idx] = { ...this.users[idx], ...body }
            return this.users[idx]
        }
        return "User Not Found"
    }