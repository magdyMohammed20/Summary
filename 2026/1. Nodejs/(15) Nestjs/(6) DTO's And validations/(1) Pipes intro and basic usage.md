(1) Pipes
-----------
==> A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

(2) Pipes Role
---------------

    Incoming Request Data
            ↓
    1. VALIDATE    → is this data valid? if not → throw error
    2. TRANSFORM   → convert data to the right type/shape
            ↓
    Route Handler


(3) basic sample of validation
--------------------------------

    users.controller.ts
    ---------------------

    import { Get, Param, ParseIntPipe } from '@nestjs/common';

    // Get user by id
    // we use ParseIntPipe to convert the id from string to number and ensure that string can converted to number
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User | undefined {
        return this.UsersService.getUserById(id)
    }