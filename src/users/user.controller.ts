import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
  @ApiOperation({ summary: "Create teacher" })
  @ApiResponse({ status: 201, description: "Create teacher successfully" })
  @ApiResponse({ status: 400, description: "Create teacher failed" })
  public async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.userService.createTeacher(createTeacherDto);
  }

  @SkipAuth()
  @Patch("teachers/:id")
  @ApiOperation({ summary: "Update teacher" })
  @ApiResponse({ status: 200, description: "Update teacher successfully" })
  @ApiResponse({ status: 400, description: "Update teacher failed" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async updateTeacher(@Param("id") id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.userService.updateTeacher(id, updateTeacherDto);
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
  @ApiOperation({ summary: "Create company" })
  @ApiResponse({ status: 201, description: "Create company successfully" })
  @ApiResponse({ status: 400, description: "Create company failed" })
  public async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.userService.createCompany(createCompanyDto);
  }

  @SkipAuth()
  @Patch("companies/:id")
  @ApiOperation({ summary: "Update company" })
  @ApiResponse({ status: 200, description: "Update company successfully" })
  @ApiResponse({ status: 400, description: "Update company failed" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async updateCompany(@Param("id") id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.userService.updateCompany(id, updateCompanyDto);
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
