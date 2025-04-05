import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "@/subject/entities/subject.entity";
import { MajorController } from "./major.controller";
import { Major } from "./entities/major.entity";
import { Semester } from "./entities/semester.entity";
import { MajorService } from "./providers/major.service";
import { MajorExistRule } from "./providers/major-exist.rule";

@Module({
  imports: [TypeOrmModule.forFeature([Major, Semester, Subject])],
  controllers: [MajorController],
  providers: [MajorService, MajorExistRule],
})
export class MajorModule {}
