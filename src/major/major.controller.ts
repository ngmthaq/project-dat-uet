import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MajorService } from "./providers/major.service";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

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
}
