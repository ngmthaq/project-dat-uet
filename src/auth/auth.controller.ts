import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseInterceptors,
  Param,
  UploadedFile,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequest } from "@/@types";
import { AuthService } from "./providers/auth.service";
import { SkipAuth } from "./providers/skip-auth.decorator";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

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

  @Post("password/change")
  @ApiOperation({ summary: "Change password" })
  @ApiResponse({ status: HttpStatus.OK, description: "Change password success" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Old password incorrect" })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorize" })
  public changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: AuthRequest) {
    return this.authService.changePassword(req.user, changePasswordDto);
  }

  @Get("cvs")
  @ApiOperation({ summary: "Get all student CVs" })
  @ApiResponse({ status: 200, description: "Get student CVs successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  public async getStudentCVs(@Req() req: AuthRequest) {
    return this.authService.getStudentCVs(req.user.id);
  }

  @Get("cvs/:cvId")
  @ApiOperation({ summary: "Get student CV by id" })
  @ApiResponse({ status: 200, description: "Get student CV successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 404, description: "Student CV not found" })
  public async getStudentCV(@Param("cvId") cvId: number, @Req() req: AuthRequest) {
    return this.authService.getStudentCV(req.user.id, cvId);
  }

  @Post("cvs")
  @UseInterceptors(FileInterceptor("cv"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload student CV" })
  @ApiResponse({ status: 200, description: "Upload CV successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 400, description: "Upload CV failed" })
  public async uploadStudentCV(@Req() req: AuthRequest, @UploadedFile() cv: Express.Multer.File) {
    return this.authService.uploadStudentCV(req.user.id, cv);
  }

  @Delete("cvs/:cvId")
  @ApiOperation({ summary: "Delete student CV" })
  @ApiResponse({ status: 200, description: "Delete student CV successfully" })
  @ApiResponse({ status: 404, description: "Student CV not found" })
  public async deleteStudentCV(@Param("cvId") cvId: number, @Req() req: AuthRequest) {
    return this.authService.deleteStudentCV(req.user.id, cvId);
  }
}
