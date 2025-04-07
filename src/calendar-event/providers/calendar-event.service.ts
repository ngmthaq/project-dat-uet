import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCalendarEventDto } from "../dto/create-calendar-event.dto";
import { UpdateCalendarEventDto } from "../dto/update-calendar-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CalendarEvent } from "../entities/calendar-event.entity";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";

@Injectable()
export class CalendarEventService {
  constructor(
    @InjectRepository(CalendarEvent) private calendarEventRepo: Repository<CalendarEvent>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createCalendarEventDto: CreateCalendarEventDto, userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException("user not found");

    const calendarEvent = new CalendarEvent();
    calendarEvent.title = createCalendarEventDto.title;
    calendarEvent.content = createCalendarEventDto.content;
    calendarEvent.from = new Date(createCalendarEventDto.from);
    calendarEvent.to = new Date(createCalendarEventDto.to);
    calendarEvent.user = user;
    await this.calendarEventRepo.save(calendarEvent);

    return true;
  }

  async findAll(userId: number) {
    return this.calendarEventRepo.find({
      where: { user: { id: userId } },
      relations: { user: true },
    });
  }

  async findOne(id: number, userId: number) {
    return this.calendarEventRepo.findOne({
      where: { id, user: { id: userId } },
      relations: { user: true },
    });
  }

  async update(id: number, updateCalendarEventDto: UpdateCalendarEventDto) {
    const calendarEvent = await this.calendarEventRepo.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!calendarEvent) throw new NotFoundException("calendar event not found");

    calendarEvent.title = updateCalendarEventDto.title;
    calendarEvent.content = updateCalendarEventDto.content;
    calendarEvent.from = new Date(updateCalendarEventDto.from);
    calendarEvent.to = new Date(updateCalendarEventDto.to);
    await this.calendarEventRepo.save(calendarEvent);

    return true;
  }

  async remove(id: number) {
    const calendarEvent = await this.calendarEventRepo.findOne({ where: { id } });
    if (!calendarEvent) throw new NotFoundException("calendar event not found");
    await this.calendarEventRepo.softDelete(calendarEvent);

    return true;
  }
}
