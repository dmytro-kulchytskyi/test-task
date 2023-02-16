import { IsOptional, IsString } from "class-validator";

export class CreatePost {
  @IsString()
  communityId!: string; 

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsString()
  text!: string;
}