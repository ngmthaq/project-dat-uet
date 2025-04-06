import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "@/subject/entities/subject.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { ClassService } from "./providers/class.service";
import { ClassController } from "./class.controller";
import { Class } from "./entities/class.entity";
import { TeacherExistRule } from "./providers/teacher-exist.rule";
import { SubjectExistRule } from "./providers/subject-exist.rule";
import { UserModule } from "@/user/user.module";
import { SubjectModule } from "@/subject/subject.module";
import { SemesterEvent } from "@/semester-event/entities/semester-event.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Subject, Teacher, SemesterEvent]),
    forwardRef(() => UserModule),
    forwardRef(() => SubjectModule),
  ],
  controllers: [ClassController],
  providers: [ClassService, TeacherExistRule, SubjectExistRule],
})
export class ClassModule {}
