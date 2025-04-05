import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMajorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "CS" })
  public majorNo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Khoa học máy tính" })
  public name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Computer Science" })
  public englishName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Cử nhân" })
  public degreeName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Kiến thức" })
  public knowledge: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Thái độ" })
  public attitude: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Kỹ năng" })
  public skills: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Kỹ sư" })
  public careerPath: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: "Tiến sĩ" })
  public higherEducation: string;
}
