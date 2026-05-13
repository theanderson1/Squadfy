import { IsEmail, IsString, MinLength, IsUUID } from "class-validator";

export class RegisterDTO {
    @IsUUID()
    organizationId!: string;

    @IsString()
    @MinLength(2)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}