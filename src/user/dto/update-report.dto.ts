import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { StudentReportStatus } from "../enums/student-report-status.enum";

export class UpdateReportDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  jobId: number;

  @IsEnum(StudentReportStatus)
  @ApiProperty({ example: StudentReportStatus.InProgress, enum: StudentReportStatus })
  status: StudentReportStatus;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({ example: 10 })
  score: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Good job!" })
  comment: string;
}
