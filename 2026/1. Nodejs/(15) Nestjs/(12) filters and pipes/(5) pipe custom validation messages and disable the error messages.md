(1) for global pipe we can disable the dto error messages or the validation messages
-------------------------------------------------------------------------------------


    main.ts
    ----------

    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { ValidationPipe } from '@nestjs/common';

    async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // global pipe
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: true // control disable the dto error messages
    }))
    
    await app.listen(process.env.PORT ?? 3000);
    }

    bootstrap();


(2) can customize the dto validation messages
-------------------------------------------------------------------------------------

    create-postMessage.dto.ts
    ----------------------------

    import { IsDateString, IsNotEmpty, IsOptional, IsString, maxLength, MaxLength, MinLength } from "class-validator";

    export class CreatePostDto {

        @IsOptional()
        id: number;

        @IsNotEmpty({ message: 'Title is required' })
        @IsString({ message: 'Title must be a string' })
        @MinLength(3, { message: 'Title must be at least 3 characters long' })
        @MaxLength(50, { message: 'Title must be at most 50 characters long' })
        title: string;

        @IsNotEmpty({ message: 'Content is required' })
        @IsString({ message: 'Content must be a string' })
        @MinLength(10, { message: 'Content must be at least 10 characters long' })
        @MaxLength(200, { message: 'Content must be at most 200 characters long' })
        content: string;

        @IsString({ message: 'Author must be a string' })
        @MinLength(3, { message: 'Author must be at least 3 characters long' })
        @MaxLength(50, { message: 'Author must be at most 50 characters long' })
        author: string;

        @IsOptional()
        @IsDateString()
        createdAt: Date;

        @IsOptional()
        @IsDateString()
        updatedAt: Date;
    }
