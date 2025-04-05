import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { SubjectCategories } from "../enums/subject-categories.enum";

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "CS101" })
  subjectNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ enum: SubjectCategories, example: SubjectCategories.SPECIALIZED })
  subjectCategory: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Nhập môn lập trình" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Introduction to Programming" })
  englishName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 3 })
  numberOfCredits: number;
}
