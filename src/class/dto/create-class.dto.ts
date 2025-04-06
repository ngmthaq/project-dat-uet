import { IsDateString, IsNotEmpty, IsString, Validate } from "class-validator";
import { TeacherExistRule } from "../providers/teacher-exist.rule";
import { SubjectExistRule } from "../providers/subject-exist.rule";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
  @IsNotEmpty()
  @Validate(TeacherExistRule)
  @ApiProperty({ example: 1 })
  teacherId: number;

  @IsNotEmpty()
  @Validate(SubjectExistRule)
  @ApiProperty({ example: 1 })
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "CS101-1" })
  classNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "H501" })
  room: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  from: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: new Date().toISOString() })
  to: string;

  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  duration: number;
}
