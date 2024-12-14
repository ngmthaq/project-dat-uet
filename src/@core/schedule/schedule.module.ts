import { Module } from "@nestjs/common";
import { ScheduleModule as AppScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [AppScheduleModule.forRoot()],
  exports: [AppScheduleModule],
})
export class ScheduleModule {}
