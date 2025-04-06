import { Module } from "@nestjs/common";
import { SemesterEventService } from "./providers/semester-event.service";
import { SemesterEventController } from "./semester-event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SemesterEvent } from "./entities/semester-event.entity";
import { Class } from "@/class/entities/class.entity";
import { User } from "@/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SemesterEvent, Class, User])],
  controllers: [SemesterEventController],
  providers: [SemesterEventService],
})
export class SemesterEventModule {}
