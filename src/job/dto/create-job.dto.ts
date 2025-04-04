import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Software Engineer" })
  public title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Software Engineer Job Detail Content" })
  public content: string;

  @IsOptional()
  @ApiProperty({ type: "string", format: "binary", required: false })
  public cover: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  public from: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  public to: Date;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  public companyId: number;
}
