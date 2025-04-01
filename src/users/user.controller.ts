import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkipAuth } from "@/auth/providers/skip-auth.decorator";
import { UserService } from "./providers/user.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";

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
}
