import { Module } from '@nestjs/common';
import { ScheduleModule as AppScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [AppScheduleModule.forRoot()],
  exports: [AppScheduleModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
