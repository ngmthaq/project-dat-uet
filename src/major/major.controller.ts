import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MajorService } from "./providers/major.service";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { CreateSemesterDto } from "./dto/create-semester.dto";
import { UpdateSemesterDto } from "./dto/update-semester.dto";

@Controller("majors")
@ApiTags("majors")
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  @ApiOperation({ summary: "Create major" })
  @ApiResponse({ status: 201, description: "The record has been successfully created" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorService.create(createMajorDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all majors" })
  @ApiResponse({ status: 200, description: "The records have been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  findAll() {
    return this.majorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get major by id" })
  @ApiResponse({ status: 200, description: "The record has been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  findOne(@Param("id") id: string) {
    return this.majorService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update major" })
  @ApiResponse({ status: 200, description: "The record has been successfully updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  update(@Param("id") id: string, @Body() updateMajorDto: UpdateMajorDto) {
    return this.majorService.update(+id, updateMajorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete major" })
  @ApiResponse({ status: 200, description: "The record has been successfully deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  remove(@Param("id") id: string) {
    return this.majorService.remove(+id);
  }

  @Get(":id/semesters")
  @ApiOperation({ summary: "Get all semesters" })
  @ApiResponse({ status: 200, description: "The records have been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  findAllSemesters(@Param("id") id: string) {
    return this.majorService.findAllSemesters(+id);
  }

  @Get(":id/semesters/:semesterId")
  @ApiOperation({ summary: "Get semester by id" })
  @ApiResponse({ status: 200, description: "The record has been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  findOneSemester(@Param("id") id: string, @Param("semesterId") semesterId: string) {
    return this.majorService.findOneSemester(+id, +semesterId);
  }

  @Post(":id/semesters")
  @ApiOperation({ summary: "Create semester" })
  @ApiResponse({ status: 201, description: "The record has been successfully created" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  createSemester(@Param("id") id: string, @Body() createSemesterDto: CreateSemesterDto) {
    return this.majorService.createSemester(+id, createSemesterDto);
  }

  @Patch(":id/semesters/:semesterId")
  @ApiOperation({ summary: "Update semester" })
  @ApiResponse({ status: 200, description: "The record has been successfully updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  updateSemester(
    @Param("id") id: string,
    @Param("semesterId") semesterId: string,
    @Body() updateSemesterDto: UpdateSemesterDto,
  ) {
    return this.majorService.updateSemester(+id, +semesterId, updateSemesterDto);
  }

  @Delete(":id/semesters/:semesterId")
  @ApiOperation({ summary: "Delete semester" })
  @ApiResponse({ status: 200, description: "The record has been successfully deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  removeSemester(@Param("id") id: string, @Param("semesterId") semesterId: string) {
    return this.majorService.removeSemester(+id, +semesterId);
  }

  @Get(":id/semesters/:semesterId/subjects")
  @ApiOperation({ summary: "Get all subjects in semester" })
  @ApiResponse({ status: 200, description: "The records have been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  findAllSubjectsInSemester(@Param("id") id: string, @Param("semesterId") semesterId: string) {
    return this.majorService.findAllSubjectsInSemester(+id, +semesterId);
  }

  @Post(":id/semesters/:semesterId/subjects")
  @ApiOperation({ summary: "Add subject to semester" })
  @ApiBody({ schema: { type: "object", properties: { subjectId: { type: "number" } } } })
  @ApiResponse({ status: 200, description: "The record has been successfully updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  addSubjectToSemester(
    @Param("id") id: string,
    @Param("semesterId") semesterId: string,
    @Body("subjectId") subjectId: string,
  ) {
    return this.majorService.addSubjectToSemester(+id, +semesterId, +subjectId);
  }

  @Delete(":id/semesters/:semesterId/subjects/:subjectId")
  @ApiOperation({ summary: "Remove subject from semester" })
  @ApiResponse({ status: 200, description: "The record has been successfully deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  removeSubjectFromSemester(
    @Param("id") id: string,
    @Param("semesterId") semesterId: string,
    @Param("subjectId") subjectId: string,
  ) {
    return this.majorService.removeSubjectFromSemester(+id, +semesterId, +subjectId);
  }
}
