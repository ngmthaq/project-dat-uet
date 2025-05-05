import dayjs from "dayjs";
import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { LoggerService } from "@/@core/logger/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CalendarEvent } from "../entities/calendar-event.entity";
import { LessThan, MoreThanOrEqual, Repository } from "typeorm";
import { NotificationService } from "@/notification/providers/notification.service";

@Injectable()
export class CalendarEventSchedule {
  public constructor(
    private loggerService: LoggerService,
    private notificationService: NotificationService,
    @InjectRepository(CalendarEvent) private calendarEventRepo: Repository<CalendarEvent>,
  ) {
    this.loggerService.setContext(CalendarEventSchedule.name);
  }

  @Interval(1 * 10 * 1000) // ms
  public async handleInterval() {
    const now = dayjs();
    const date = now.toDate();
    const futureEvents = await this.calendarEventRepo.find({
      where: { from: MoreThanOrEqual(date), to: LessThan(date) },
      relations: { user: true },
    });

    const nowHour = now.hour();
    const nowMinute = now.minute();
    const nowSecond = now.second();
    futureEvents.forEach((event) => {
      const user = event.user;
      const from = dayjs(event.from);
      const hour = from.hour();
      const minute = from.minute();
      const second = from.second();
      if (nowHour === hour && nowMinute === minute && nowSecond === second) {
        this.notificationService.create({
          title: "Calendar Event Reminder",
          content: `You have an event scheduled for ${event.title} at ${from.format("HH:mm")}`,
          userId: user.id,
          metadata: JSON.stringify({ event: event.id, user: user.id }),
          isRead: false,
        });
      }
    });
  }
}
