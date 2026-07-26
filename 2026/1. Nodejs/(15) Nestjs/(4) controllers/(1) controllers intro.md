(1) controller
-----------------
==> responsible for handling incoming requests and sending responses back to the client.
==> The routing mechanism determines which controller will handle each request.
==> To create a basic controller, we use classes and decorators. Decorators link classes with the necessary 
metadata, allowing Nest to create a routing map that connects requests to their corresponding controllers.
==> We'll specify an optional route path prefix of cats. Using a path prefix in the @Controller() 
decorator helps us group related routes together and reduces repetitive code.

EX
---- 


    import { Controller, Get } from '@nestjs/common';

    @Controller('cats')
    export class CatsController {
        @Get()
        findAll(): string { // /cats
            return 'This action returns all cats';
        }

        @Get(':id')
        findOne(@Param('id') id: string): string { // /cats/:id
            return `This action returns a #${id} cat`;
        }
    }
