import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkipAuth } from "@/auth/providers/skip-auth.decorator";
import { UserService } from "./providers/user.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Controller("users")
@ApiTags("users")
export class UserController {
  public constructor(private userService: UserService) {}

  @SkipAuth()
  @Get("teachers")
  @ApiOperation({ summary: "Get all teachers" })
  @ApiResponse({ status: 200, description: "Get teachers successfully" })
  public async getTeachers() {
    return this.userService.getTeachers();
  }

  @SkipAuth()
  @Get("teachers/:id")
  @ApiOperation({ summary: "Get teacher by id" })
  @ApiResponse({ status: 200, description: "Get teacher successfully" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async getTeacher(@Param("id") id: number) {
    return this.userService.getTeacher(id);
  }

  @SkipAuth()
  @Post("teachers")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create teacher" })
  @ApiResponse({ status: 201, description: "Create teacher successfully" })
  @ApiResponse({ status: 400, description: "Create teacher failed" })
  public async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.createTeacher(createTeacherDto, avatar);
  }

  @SkipAuth()
  @Patch("teachers/:id")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update teacher" })
  @ApiResponse({ status: 200, description: "Update teacher successfully" })
  @ApiResponse({ status: 400, description: "Update teacher failed" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async updateTeacher(
    @Param("id") id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateTeacher(id, updateTeacherDto, avatar);
  }

  @SkipAuth()
  @Delete("teachers/:id")
  @ApiOperation({ summary: "Delete teacher" })
  @ApiResponse({ status: 200, description: "Delete teacher successfully" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async deleteTeacher(@Param("id") id: number) {
    return this.userService.deleteTeacher(id);
  }

  @SkipAuth()
  @Get("companies")
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({ status: 200, description: "Get companies successfully" })
  public async getCompanies() {
    return this.userService.getCompanies();
  }

  @SkipAuth()
  @Get("companies/:id")
  @ApiOperation({ summary: "Get company by id" })
  @ApiResponse({ status: 200, description: "Get company successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async getCompany(@Param("id") id: number) {
    return this.userService.getCompany(id);
  }

  @SkipAuth()
  @Post("companies")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create company" })
  @ApiResponse({ status: 201, description: "Create company successfully" })
  @ApiResponse({ status: 400, description: "Create company failed" })
  public async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.createCompany(createCompanyDto, avatar);
  }

  @SkipAuth()
  @Patch("companies/:id")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update company" })
  @ApiResponse({ status: 200, description: "Update company successfully" })
  @ApiResponse({ status: 400, description: "Update company failed" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async updateCompany(
    @Param("id") id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateCompany(id, updateCompanyDto, avatar);
  }

  @SkipAuth()
  @Delete("companies/:id")
  @ApiOperation({ summary: "Delete company" })
  @ApiResponse({ status: 200, description: "Delete company successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async deleteCompany(@Param("id") id: number) {
    return this.userService.deleteCompany(id);
  }
}
