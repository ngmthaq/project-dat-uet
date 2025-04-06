import { UserService } from "@/user/providers/user.service";
import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "TeacherExistRule", async: true })
@Injectable()
export class TeacherExistRule implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: number) {
    try {
      const users = await this.userService.getTeachers();
      const teacher = users.find((user) => user.teacher.id === value);
      return Boolean(teacher);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage() {
    return `subject is not exist`;
  }
}
