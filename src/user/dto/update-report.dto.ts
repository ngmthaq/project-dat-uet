import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { StudentReportStatus } from "../enums/student-report-status.enum";

export class UpdateReportDto {
  @IsEnum(StudentReportStatus)
  @ApiProperty({ example: StudentReportStatus.InProgress, enum: StudentReportStatus })
  status: StudentReportStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({ example: 10 })
  score?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: "Good job!" })
  comment?: string;
}
