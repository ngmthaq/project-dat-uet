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
import { UserService } from "./providers/user.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Controller("users")
@ApiTags("users")
export class UserController {
  public constructor(private userService: UserService) {}

  @Get("teachers")
  @ApiOperation({ summary: "Get all teachers" })
  @ApiResponse({ status: 200, description: "Get teachers successfully" })
  public async getTeachers() {
    return this.userService.getTeachers();
  }

  @Get("teachers/:id")
  @ApiOperation({ summary: "Get teacher by id" })
  @ApiResponse({ status: 200, description: "Get teacher successfully" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async getTeacher(@Param("id") id: number) {
    return this.userService.getTeacher(id);
  }

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

  @Delete("teachers/:id")
  @ApiOperation({ summary: "Delete teacher" })
  @ApiResponse({ status: 200, description: "Delete teacher successfully" })
  @ApiResponse({ status: 404, description: "Teacher not found" })
  public async deleteTeacher(@Param("id") id: number) {
    return this.userService.deleteTeacher(id);
  }

  @Get("companies")
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({ status: 200, description: "Get companies successfully" })
  public async getCompanies() {
    return this.userService.getCompanies();
  }

  @Get("companies/:id")
  @ApiOperation({ summary: "Get company by id" })
  @ApiResponse({ status: 200, description: "Get company successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async getCompany(@Param("id") id: number) {
    return this.userService.getCompany(id);
  }

  @Get("companies/:id/jobs")
  @ApiOperation({ summary: "Get company jobs" })
  @ApiResponse({ status: 200, description: "Get company jobs successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async getCompanyJobs(@Param("id") id: number) {
    return this.userService.getCompanyJobs(id);
  }

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

  @Delete("companies/:id")
  @ApiOperation({ summary: "Delete company" })
  @ApiResponse({ status: 200, description: "Delete company successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  public async deleteCompany(@Param("id") id: number) {
    return this.userService.deleteCompany(id);
  }

  @Get("students")
  @ApiOperation({ summary: "Get all students" })
  @ApiResponse({ status: 200, description: "Get students successfully" })
  public async getStudents() {
    return this.userService.getStudents();
  }

  @Get("students/:id")
  @ApiOperation({ summary: "Get student by id" })
  @ApiResponse({ status: 200, description: "Get student successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  public async getStudent(@Param("id") id: number) {
    return this.userService.getStudent(id);
  }

  @Post("students")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create student" })
  @ApiResponse({ status: 201, description: "Create student successfully" })
  @ApiResponse({ status: 400, description: "Create student failed" })
  public async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.createStudent(createStudentDto, avatar);
  }

  @Patch("students/:id")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update student" })
  @ApiResponse({ status: 200, description: "Update student successfully" })
  @ApiResponse({ status: 400, description: "Update student failed" })
  @ApiResponse({ status: 404, description: "Student not found" })
  public async updateStudent(
    @Param("id") id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    return this.userService.updateStudent(id, updateStudentDto, avatar);
  }

  @Delete("students/:id")
  @ApiOperation({ summary: "Delete student" })
  @ApiResponse({ status: 200, description: "Delete student successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  public async deleteStudent(@Param("id") id: number) {
    return this.userService.deleteStudent(id);
  }

  @Get("students/:id/cvs")
  @ApiOperation({ summary: "Get all student CVs" })
  @ApiResponse({ status: 200, description: "Get student CVs successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  public async getStudentCVs(@Param("id") id: number) {
    return this.userService.getStudentCVs(id);
  }

  @Get("students/:id/cvs/:cvId")
  @ApiOperation({ summary: "Get student CV by id" })
  @ApiResponse({ status: 200, description: "Get student CV successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 404, description: "Student CV not found" })
  public async getStudentCV(@Param("id") id: number, @Param("cvId") cvId: number) {
    return this.userService.getStudentCV(id, cvId);
  }

  @Post("students/:id/cvs")
  @UseInterceptors(FileInterceptor("cv"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload student CV" })
  @ApiResponse({ status: 200, description: "Upload CV successfully" })
  @ApiResponse({ status: 404, description: "Student not found" })
  @ApiResponse({ status: 400, description: "Upload CV failed" })
  public async uploadStudentCV(@Param("id") id: number, @UploadedFile() cv: Express.Multer.File) {
    return this.userService.uploadStudentCV(id, cv);
  }

  @Delete("students/:id/cvs/:cvId")
  @ApiOperation({ summary: "Delete student CV" })
  @ApiResponse({ status: 200, description: "Delete student CV successfully" })
  @ApiResponse({ status: 404, description: "Student CV not found" })
  public async deleteStudentCV(@Param("id") id: number, @Param("cvId") cvId: number) {
    return this.userService.deleteStudentCV(id, cvId);
  }
}
