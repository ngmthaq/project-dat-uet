import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ClassService } from "./providers/class.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { UpdateClassDto } from "./dto/update-class.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("classes")
@ApiTags("classes")
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @ApiOperation({ summary: "Create class" })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "The record has been successfully created" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all classes" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The records have been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  findAll() {
    return this.classService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get class by id" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The record has been successfully retrieved" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  findOne(@Param("id") id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update class" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The record has been successfully updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  update(@Param("id") id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete class" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The record has been successfully deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Not found" })
  remove(@Param("id") id: string) {
    return this.classService.remove(+id);
  }
}
