import { IsObject, IsOptional, IsString, } from "class-validator";

export class CreateAgentLogDTO {
    @IsString()
    question!: string;

    @IsString()
    answer!: string;

    @IsString()
    decision!: string;

    @IsOptional()
    @IsObject()
    contextUsed?: unknown;
}