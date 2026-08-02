(1) global pipe
-----------------

    main.ts
    ---------

    import { ValidationPipe } from '@nestjs/common';
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';


    async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        transform: true, // for nested DTOs
        whitelist: true, // strip properties not in the DTO
        forbidNonWhitelisted: true, // reject requests with extra properties
        transform: true, // auto-convert payloads to DTO class instances
    }))

    await app.listen(3000);
    }
    bootstrap();


(2) sample for global pipe to trim spaces from string properties in the request body
-----------------

    trim.pipe.ts
    ------------

    // src/pipes/trim.pipe.ts
    import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

    @Injectable()
    export class TrimPipe implements PipeTransform {
        transform(value: any, metadata: ArgumentMetadata) {
            return this.trimValue(value);
        }

        private trimValue(value: any): any {
            if (typeof value === 'string') {
                return value.trim();
            }

            if (Array.isArray(value)) {
                return value.map((item) => this.trimValue(item));
            }

            if (value && typeof value === 'object') {
                const result: any = {};
                for (const key in value) {
                    result[key] = this.trimValue(value[key]);
                }
                return result;
            }

            return value; // numbers, booleans, null, undefined — untouched
        }
    }

    main.ts
    ---------

    import { ValidationPipe } from '@nestjs/common';
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { TrimPipe } from './pipes/trim/trim.pipe';


    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.useGlobalPipes(new TrimPipe(), new ValidationPipe({
            whitelist: true, // strip properties not in the DTO
            forbidNonWhitelisted: true, // reject requests with extra properties
            transform: true, // auto-convert payloads to DTO class instances
        }))

        await app.listen(3000);
    }
    bootstrap();


(3) Consistent error response shaping
---------------------------------------

    main.ts
    ---------

    import { BadRequestException, ValidationPipe } from '@nestjs/common';
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { TrimPipe } from './pipes/trim/trim.pipe';


    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.useGlobalPipes(new TrimPipe(), new ValidationPipe({
            //////// here /////////
            exceptionFactory: (errors) => new BadRequestException(
                errors.map(e => ({ field: e.property, errors: Object.values(e.constraints || {}) }))
            ),
            whitelist: true, // strip properties not in the DTO
            forbidNonWhitelisted: true, // reject requests with extra properties
            transform: true, // auto-convert payloads to DTO class instances
        }))

        await app.listen(3000);
    }
    bootstrap();


(4) produce validation messages for nested DTOs
-------------------------------------------------

    main.ts
    ---------

    import { BadRequestException, ValidationPipe } from '@nestjs/common';
    import { NestFactory } from '@nestjs/core';
    import { ValidationError } from 'class-validator';
    import { AppModule } from './app.module';
    import { TrimPipe } from './pipes/trim/trim.pipe';

    // for produce validation messages for nested DTOs
    function flattenErrors(errors: ValidationError[], parentPath = ''): { field: string; errors: string[] }[] {
        return errors.flatMap((err) => {
            const path = parentPath ? `${parentPath}.${err.property}` : err.property;
            const ownErrors = err.constraints ? Object.values(err.constraints) : [];
            const childErrors = err.children?.length ? flattenErrors(err.children, path) : [];

            const result: { field: string; errors: string[] }[] = [];
            if (ownErrors.length) {
                result.push({ field: path, errors: ownErrors });
            }
            return [...result, ...childErrors];
        });
    }

    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.useGlobalPipes(
            new TrimPipe(),
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
                exceptionFactory: (errors) => new BadRequestException(flattenErrors(errors)),
            }),
        );

        await app.listen(3000);
    }
    bootstrap();