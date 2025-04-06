import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Class } from "@/class/entities/class.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { SubjectService } from "./providers/subject.service";
import { SubjectController } from "./subject.controller";
import { Subject } from "./entities/subject.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Class, Teacher])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
