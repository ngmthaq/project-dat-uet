import { Module } from "@nestjs/common";
import { CalendarEventService } from "./providers/calendar-event.service";
import { CalendarEventController } from "./calendar-event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalendarEvent } from "./entities/calendar-event.entity";
import { User } from "@/user/entities/user.entity";
import { CalendarEventSchedule } from "./providers/calendar-event.schedule";
import { LoggerModule } from "@/@core/logger/logger.module";
import { NotificationModule } from "@/notification/notification.module";

@Module({
  imports: [LoggerModule, NotificationModule, TypeOrmModule.forFeature([CalendarEvent, User])],
  controllers: [CalendarEventController],
  providers: [CalendarEventService, CalendarEventSchedule],
})
export class CalendarEventModule {}
