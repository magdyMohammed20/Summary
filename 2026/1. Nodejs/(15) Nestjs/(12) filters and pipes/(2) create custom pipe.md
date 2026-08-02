(1) create custom pipe
-------------------------
==> step0: nest g pi pipes/uppercase
==> step1: create product dto
==> step2: create product controller


    pipes/uppercase/uppercase.pipe.ts
    ------------------------------------

    import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

    @Injectable()
    export class UppercasePipe implements PipeTransform {
        transform(value: any, metadata: ArgumentMetadata) {

            if (!value || typeof value.name !== 'string') {
                throw new BadRequestException('Invalid input: name must be a string');
            }


            return typeof value.name === 'string' ? value.name.toUpperCase() : false;
        }
    }

    products/dto/create-product.dto.ts
    ------------------------------------

    import { IsNotEmpty, IsString } from "class-validator";

    export class CreateProductDto {

        @IsString()
        @IsNotEmpty()
        name: string;
    }

    products/products.controller.ts
    ------------------------------------

    import { Controller, Post } from '@nestjs/common';
    import { ProductsService } from './products.service';
    import { CreateProductDto } from './dto/create-product.dto';
    import { UppercasePipe } from 'src/pipes/uppercase/uppercase.pipe';

    @Controller('products')
    export class ProductsController {
        constructor(private readonly productsService: ProductsService) { }

        @Post()
        // pipe usage in controller
        create(@Body(UppercasePipe) createProductDto: CreateProductDto) {
            return this.productsService.create(createProductDto);
        }
    }