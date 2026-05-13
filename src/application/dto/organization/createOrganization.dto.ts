import { IsString, MinLength } from "class-validator";

export class CreateOrganizationDTO {
    @IsString()
    @MinLength(2)
    name!: string;
}