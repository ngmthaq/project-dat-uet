import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SemesterEventService } from "./providers/semester-event.service";
import { CreateSemesterEventDto } from "./dto/create-semester-event.dto";
import { UpdateSemesterEventDto } from "./dto/update-semester-event.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("events/semesters")
@ApiTags("semester-events")
export class SemesterEventController {
  constructor(private readonly semesterEventService: SemesterEventService) {}

  @Post()
  @ApiOperation({ summary: "Create a new semester event" })
  @ApiResponse({ status: 201, description: "The semester event has been successfully created." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  create(@Body() createSemesterEventDto: CreateSemesterEventDto) {
    return this.semesterEventService.create(createSemesterEventDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all semester events" })
  @ApiResponse({ status: 200, description: "List of all semester events." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findAll() {
    return this.semesterEventService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a semester event by ID" })
  @ApiResponse({ status: 200, description: "The semester event has been successfully retrieved." })
  @ApiResponse({ status: 404, description: "Semester event not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findOne(@Param("id") id: string) {
    return this.semesterEventService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a semester event by ID" })
  @ApiResponse({ status: 200, description: "The semester event has been successfully updated." })
  @ApiResponse({ status: 404, description: "Semester event not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  update(@Param("id") id: string, @Body() updateSemesterEventDto: UpdateSemesterEventDto) {
    return this.semesterEventService.update(+id, updateSemesterEventDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a semester event by ID" })
  @ApiResponse({ status: 200, description: "The semester event has been successfully deleted." })
  @ApiResponse({ status: 404, description: "Semester event not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  remove(@Param("id") id: string) {
    return this.semesterEventService.remove(+id);
  }

  @Get(":id/classes")
  @ApiOperation({ summary: "Get all classes for semester events" })
  @ApiResponse({ status: 200, description: "List of all classes for semester events." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiResponse({ status: 404, description: "Semester event not found." })
  getClasses(@Param("id") id: string) {
    return this.semesterEventService.getClasses(+id);
  }

  @Post(":id/classes")
  @ApiOperation({ summary: "Add classes to a semester event" })
  @ApiResponse({
    status: 200,
    description: "Classes have been successfully added to the semester event.",
  })
  @ApiResponse({ status: 404, description: "Semester event not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  addClasses(@Param("id") id: string, @Body() classIds: number[]) {
    return this.semesterEventService.addClasses(+id, classIds);
  }

  @Delete(":id/classes/:classId")
  @ApiOperation({ summary: "Remove a class from a semester event" })
  @ApiResponse({
    status: 200,
    description: "The class has been successfully removed from the semester event.",
  })
  @ApiResponse({ status: 404, description: "Semester event or class not found." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  removeClass(@Param("id") id: string, @Param("classId") classId: string) {
    return this.semesterEventService.removeClass(+id, +classId);
  }
}
