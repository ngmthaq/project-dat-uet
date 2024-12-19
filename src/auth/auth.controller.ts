import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req } from "@nestjs/common";
import { AuthRequest } from "@/@types";
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

  @Get("user")
  public getAuthUser(@Req() req: AuthRequest) {
    return this.authService.getAuthUser(req.user.id);
  }
}
