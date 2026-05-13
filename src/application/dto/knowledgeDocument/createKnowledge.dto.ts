import {
  IsEnum,
  IsString,
} from "class-validator";

export class CreateKnowledgeDTO {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsEnum([
    "PUBLIC",
    "INTERNAL",
    "RESTRICTED",
  ])
  visibility!:
    | "PUBLIC"
    | "INTERNAL"
    | "RESTRICTED";
}