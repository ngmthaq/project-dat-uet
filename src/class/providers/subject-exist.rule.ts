import { SubjectService } from "@/subject/providers/subject.service";
import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "SubjectExistRule", async: true })
@Injectable()
export class SubjectExistRule implements ValidatorConstraintInterface {
  constructor(private subjectService: SubjectService) {}

  async validate(value: number) {
    try {
      const subject = await this.subjectService.findOne(value);
      return Boolean(subject);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage() {
    return `subject is not exist`;
  }
}
