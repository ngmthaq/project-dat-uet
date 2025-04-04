import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JobService } from "./providers/job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Controller("jobs")
@ApiTags("jobs")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseInterceptors(FileInterceptor("cover"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Create job" })
  @ApiResponse({ status: 201, description: "Create job successfully" })
  @ApiResponse({ status: 400, description: "Create job failed" })
  create(@Body() createJobDto: CreateJobDto, @UploadedFile() cover?: Express.Multer.File) {
    return this.jobService.create(createJobDto, cover);
  }

  @Get()
  @ApiOperation({ summary: "Get all jobs" })
  @ApiResponse({ status: 200, description: "Get all jobs successfully" })
  @ApiResponse({ status: 404, description: "Jobs not found" })
  findAll() {
    return this.jobService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get job by id" })
  @ApiResponse({ status: 200, description: "Get job successfully" })
  @ApiResponse({ status: 404, description: "Job not found" })
  @ApiResponse({ status: 400, description: "Invalid id" })
  findOne(@Param("id") id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("cover"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Update job" })
  @ApiResponse({ status: 200, description: "Update job successfully" })
  @ApiResponse({ status: 404, description: "Job not found" })
  @ApiResponse({ status: 400, description: "Invalid id" })
  update(
    @Param("id") id: string,
    @Body() updateJobDto: UpdateJobDto,
    @UploadedFile() cover?: Express.Multer.File,
  ) {
    return this.jobService.update(+id, updateJobDto, cover);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete job" })
  @ApiResponse({ status: 200, description: "Delete job successfully" })
  @ApiResponse({ status: 404, description: "Job not found" })
  @ApiResponse({ status: 400, description: "Invalid id" })
  remove(@Param("id") id: string) {
    return this.jobService.remove(+id);
  }
}
