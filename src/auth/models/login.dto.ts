import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
  })
  public password: string;
}
