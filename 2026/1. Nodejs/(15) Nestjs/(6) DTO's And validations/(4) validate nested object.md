(1) validate nested object
----------------------------
==> Handle The validation for 'address' object for the user

    src/users/dto/create-user.dto.ts
    ---------------------------------

    import { Type } from 'class-transformer';
    import { IsString, IsNotEmpty, Length, Matches, IsObject, ValidateNested, IsOptional, IsInt } from 'class-validator';

    // 1- Handle validation for the address dto
    export class AddressDto {
        @IsString()
        @IsNotEmpty()
        country: string;

        @IsString()
        @IsNotEmpty()
        city: string;
    }

    export class CreateUserDto {

        @IsOptional()
        @IsInt()
        id: number;

        @IsString()
        @IsNotEmpty()
        @Length(3, 20)
        @Matches(/^[a-zA-Z\s]+$/, {
            message: 'name must contain only letters'
        })
        name: string;

        // 2- handle the validation for the address using '@Type' and 'ValidateNested' decorators
        @IsOptional()
        @IsObject()
        @ValidateNested()
        @Type(() => AddressDto)
        address?: AddressDto;
    }
