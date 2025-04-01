import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUrl, Validate } from "class-validator";
import { CompanyType } from "../enums/company-type.enum";
import { EmailExistedRule } from "../providers/email-exited.rule";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(EmailExistedRule)
  @ApiProperty({ example: "contact@bglobal.vn" })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "bGlobal JSC" })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Hanoi, Vietnam" })
  public address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "0987654321" })
  public phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Description of this company" })
  public description: string;

  @IsNotEmpty()
  @IsEnum(CompanyType)
  @ApiProperty({ example: CompanyType.Partner, enum: CompanyType })
  public type: CompanyType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Cyber Sercurity" })
  public domain: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({ example: "https://bglobal.vn" })
  public website: string;
}
