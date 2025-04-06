import { Module } from "@nestjs/common";
import { CalendarEventService } from "./providers/calendar-event.service";
import { CalendarEventController } from "./calendar-event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalendarEvent } from "./entities/calendar-event.entity";
import { User } from "@/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, User])],
  controllers: [CalendarEventController],
  providers: [CalendarEventService],
})
export class CalendarEventModule {}
