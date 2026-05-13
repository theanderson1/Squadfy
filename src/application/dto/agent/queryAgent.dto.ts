import { IsString, MinLength } from "class-validator";

export class QueryAgentDTO {
    @IsString()
    @MinLength(3)
    question!: string;
}