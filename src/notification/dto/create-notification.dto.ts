import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  isRead: boolean;

  @IsNotEmpty()
  @IsString()
  metadata: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
