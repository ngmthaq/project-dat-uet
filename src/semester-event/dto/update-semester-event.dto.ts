import { PartialType } from "@nestjs/mapped-types";
import { CreateSemesterEventDto } from "./create-semester-event.dto";

export class UpdateSemesterEventDto extends PartialType(CreateSemesterEventDto) {}
