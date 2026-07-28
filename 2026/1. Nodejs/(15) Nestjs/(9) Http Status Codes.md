(1) Http Status Codes
----------------------
==> NestJS provides built-in HTTP exceptions from '@nestjs/common'

    import {
        BadRequestException,
        UnauthorizedException,
        ForbiddenException,
        NotFoundException,
        ConflictException,
        GoneException,
        PayloadTooLargeException,
        UnsupportedMediaTypeException,
        UnprocessableEntityException,
        InternalServerErrorException,
        NotImplementedException,
        BadGatewayException,
        ServiceUnavailableException,
        GatewayTimeoutException,
        HttpException
    } from '@nestjs/common';

(2) Common HTTP Exceptions
----------------------------
==> BadRequestException (400) - Invalid request data, validation errors
==> UnauthorizedException (401) - Missing or invalid authentication
==> ForbiddenException (403) - Authenticated but not authorized
==> NotFoundException (404) - Resource not found
==> RequestTimeoutException (408) - Request timeout
==> ConflictException (409) - Resource already exists, conflict
==> GoneException (410) - Resource permanently removed
==> PayloadTooLargeException (413) - Request body too large
==> UnsupportedMediaTypeException (415) - Unsupported content type
==> UnprocessableEntityException (422) - Validation errors, semantic errors
==> InternalServerErrorException (500) - Server error
==> NotImplementedException (501) - Feature not implemented
==> BadGatewayException (502) - Invalid upstream response
==> ServiceUnavailableException (503) - Service temporarily unavailable
==> GatewayTimeoutException (504) - Upstream timeout

(3) Basic Exception Usage
---------------------------

    users.controller.ts
    ---------------------

    import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

    @Controller('users')
    export class UsersController {

        @Get(':id')
        getUserById(@Param('id', ParseIntPipe) id: number) {
            const user = this.usersService.findById(id);
            
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            
            return user;
        }
    }

(4) Custom Exception Message
-------------------------------

    throw new BadRequestException({
        statusCode: 400,
        message: ['name is required', 'email is invalid'],
        error: 'Bad Request'
    });

(5) Custom HTTP Exception
----------------------------

    import { HttpException, HttpStatus } from '@nestjs/common';

    // Custom status code
    throw new HttpException('Custom error message', HttpStatus.I_AM_A_TEAPOT); // 418

    // Custom response object
    throw new HttpException(
        {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
    );

(6) HttpCode Decorator
------------------------

    import { Controller, Post, HttpCode } from '@nestjs/common';

    @Controller('users')
    export class UsersController {

        @Post()
        @HttpCode(201)  // Default is 200 for POST
        createUser() {
            // ...
        }

        @Post('login')
        @HttpCode(200)  // Explicitly set 200
        login() {
            // ...
        }
    }

(7) Status Code Constants (HttpStatus.*)
-------------------------------------------

    ==> 2xx - Success
        200 = HttpStatus.OK - Request succeeded
        201 = HttpStatus.CREATED - Resource created
        202 = HttpStatus.ACCEPTED - Request accepted
        204 = HttpStatus.NO_CONTENT - No content to return

    ==> 3xx - Redirection
        301 = HttpStatus.MOVED_PERMANENTLY - Permanent redirect
        302 = HttpStatus.FOUND - Temporary redirect
        304 = HttpStatus.NOT_MODIFIED - Not modified (caching)

    ==> 4xx - Client Errors
        400 = HttpStatus.BAD_REQUEST - Invalid request
        401 = HttpStatus.UNAUTHORIZED - Authentication required
        403 = HttpStatus.FORBIDDEN - Not authorized
        404 = HttpStatus.NOT_FOUND - Resource not found
        405 = HttpStatus.METHOD_NOT_ALLOWED - Method not allowed
        408 = HttpStatus.REQUEST_TIMEOUT - Request timeout
        409 = HttpStatus.CONFLICT - Conflict with state
        410 = HttpStatus.GONE - Resource removed
        413 = HttpStatus.PAYLOAD_TOO_LARGE - Payload too large
        415 = HttpStatus.UNSUPPORTED_MEDIA_TYPE - Unsupported media type
        422 = HttpStatus.UNPROCESSABLE_ENTITY - Validation error
        429 = HttpStatus.TOO_MANY_REQUESTS - Rate limited

    ==> 5xx - Server Errors
        500 = HttpStatus.INTERNAL_SERVER_ERROR - Server error
        501 = HttpStatus.NOT_IMPLEMENTED - Not implemented
        502 = HttpStatus.BAD_GATEWAY - Bad gateway
        503 = HttpStatus.SERVICE_UNAVAILABLE - Service unavailable
        504 = HttpStatus.GATEWAY_TIMEOUT - Gateway timeout

(8) Complete CRUD Example with Status Codes
---------------------------------------------

    products.controller.ts
    ------------------------

    import {
        Controller, Get, Post, Put, Delete,
        Param, Body, HttpCode, HttpStatus,
        NotFoundException, BadRequestException,
        ConflictException
    } from '@nestjs/common';

    @Controller('products')
    export class ProductsController {

        // GET /products - 200 OK
        @Get()
        findAll() {
            return this.productsService.findAll();
        }

        // GET /products/:id - 200 OK or 404 Not Found
        @Get(':id')
        findOne(@Param('id') id: string) {
            const product = this.productsService.findById(+id);
            if (!product) {
                throw new NotFoundException(`Product #${id} not found`);
            }
            return product;
        }

        // POST /products - 201 Created or 400/409
        @Post()
        @HttpCode(HttpStatus.CREATED)
        create(@Body() createProductDto: CreateProductDto) {
            if (!createProductDto.name) {
                throw new BadRequestException('Name is required');
            }
            
            const existing = this.productsService.findByName(createProductDto.name);
            if (existing) {
                throw new ConflictException('Product already exists');
            }
            
            return this.productsService.create(createProductDto);
        }

        // PUT /products/:id - 200 OK or 404/400
        @Put(':id')
        update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
            const product = this.productsService.findById(+id);
            if (!product) {
                throw new NotFoundException(`Product #${id} not found`);
            }
            return this.productsService.update(+id, updateProductDto);
        }

        // DELETE /products/:id - 204 No Content or 404
        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        remove(@Param('id') id: string) {
            const product = this.productsService.findById(+id);
            if (!product) {
                throw new NotFoundException(`Product #${id} not found`);
            }
            this.productsService.remove(+id);
        }
    }
