import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "securepassword1" })
  public password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "securepassword2" })
  public newPassword: string;
}
