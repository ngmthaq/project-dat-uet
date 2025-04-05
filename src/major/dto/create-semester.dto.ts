import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { MajorExistRule } from "../providers/major-exist.rule";

export class CreateSemesterDto {
  @IsNotEmpty()
  @Validate(MajorExistRule)
  @ApiProperty({ example: 1 })
  public majorId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "1" })
  public year: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "1" })
  public period: string;
}
