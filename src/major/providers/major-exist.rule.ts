import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { MajorService } from "./major.service";

@ValidatorConstraint({ name: "EmailExisted", async: true })
@Injectable()
export class MajorExistRule implements ValidatorConstraintInterface {
  constructor(private majorService: MajorService) {}

  async validate(value: number) {
    try {
      const major = await this.majorService.findOne(value);
      return Boolean(major);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage() {
    return `major is not exist`;
  }
}
