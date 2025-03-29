import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "john_doe" })
  public username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "securepassword1" })
  public password: string;
}
