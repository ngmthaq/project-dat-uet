import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCalendarEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Title of the calendar event" })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Content of the calendar event" })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: new Date().toISOString() })
  from: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: new Date().toISOString() })
  to: string;
}
