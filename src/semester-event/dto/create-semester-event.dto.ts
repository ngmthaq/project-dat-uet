import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSemesterEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Title of the semester event" })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: new Date().toISOString() })
  from: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: new Date().toISOString() })
  to: string;

  @IsNotEmpty()
  userId: number;
}
