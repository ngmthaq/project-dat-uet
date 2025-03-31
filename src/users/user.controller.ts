import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SkipAuth } from "@/auth/providers/skip-auth.decorator";
import { UserService } from "./providers/user.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";

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
}
