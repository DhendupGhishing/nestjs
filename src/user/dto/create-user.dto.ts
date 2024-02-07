import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

const passwordRegEx =
    /^.{8,20}$/;

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    username: string;

    @IsNotEmpty()
    email: string;

    @IsInt()
    age: number;

    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
        message: `Password must contain Minimum 8 and maximum 20 characters`
    })
    password: string;
}