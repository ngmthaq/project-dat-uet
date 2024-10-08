import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./providers/auth.service";
import { SkipAuth } from "./providers/skip-auth.decorator";
import { LoginDto } from "./models/login.dto";

@Controller("auth")
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @Post("login")
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
