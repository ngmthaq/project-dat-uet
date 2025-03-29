import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequest } from "@/@types";
import { AuthService } from "./providers/auth.service";
import { SkipAuth } from "./providers/skip-auth.decorator";
import { LoginDto } from "./models/login.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @SkipAuth()
  @Post("login")
  @ApiOperation({ summary: "Login", description: "Login to the system" })
  @ApiResponse({ status: HttpStatus.OK, description: "Login successful" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid credentials" })
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("user")
  @ApiOperation({ summary: "Auth user", description: "Get auth user profile" })
  @ApiResponse({ status: HttpStatus.OK, description: "Success" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorize" })
  public getAuthUser(@Req() req: AuthRequest) {
    return this.authService.getAuthUser(req.user.id);
  }
}
