import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  jobId: number;
}
