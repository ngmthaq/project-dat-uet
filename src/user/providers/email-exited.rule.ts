import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "./user.service";

@ValidatorConstraint({ name: "EmailExisted", async: true })
@Injectable()
export class EmailExistedRule implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: string) {
    try {
      const user = await this.userService.findByEmail(value);
      return !Boolean(user);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage() {
    return `email is existed`;
  }
}
