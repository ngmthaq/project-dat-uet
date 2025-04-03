import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { Gender } from "../enums/gender.enum";
import { EmailExistedRule } from "../providers/email-exited.rule";

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(EmailExistedRule)
  @ApiProperty({ example: "john_doe@example.com" })
  public email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  public teacherId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "John Doe" })
  public name: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ example: Gender.Male, enum: Gender })
  public gender: Gender;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Hanoi, Vietnam" })
  public address: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  public birthday: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "K54S3" })
  public className: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "0987654321" })
  public phoneNumber: string;

  @IsOptional()
  @ApiProperty({ type: "string", format: "binary", required: false })
  public avatar?: Express.Multer.File;
}
