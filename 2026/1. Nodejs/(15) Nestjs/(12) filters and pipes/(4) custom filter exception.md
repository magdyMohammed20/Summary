(1) custom filter exception
-----------------------------
==> note here error message of dto will be produced before the custom exception message because the validation pipe is executed before the service method is called. The validation pipe checks the DTO and throws an error if the validation fails, which happens before the service method is executed.


    products/dto/create-product.dto.ts
    -----------------------------------

    import { IsInt, IsNotEmpty, IsString, Max } from "class-validator";

    export class CreateProductDto {

        @IsString()
        @IsNotEmpty()
        name: string;

        @IsInt()
        @IsNotEmpty()
        @Max(500, { message: 'price must be greater than or equal to 500' })
        price: number;
    }



    exceptions/CustomException.ts
    -----------------------------

    import { HttpException, HttpStatus } from "@nestjs/common";


    export default class CustomException extends HttpException {
        constructor(msg: string = 'Error In Creating', statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
            super(msg, statusCode);
        }
    }


    products/products.service.ts
    -----------------------------

    import { Injectable } from '@nestjs/common';
    import { CreateProductDto } from './dto/create-product.dto';
    import CustomException from 'src/exceptions/CustomException';

    @Injectable()
    export class ProductsService {
        create(createProductDto: CreateProductDto) {
            
            if (createProductDto.price > 500) {
                throw new CustomException("Price must be less than or equal to 500", 400);
            }
            return 'This action adds a new product';
        }

    }
