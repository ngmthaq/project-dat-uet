import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { CalendarEventService } from "./providers/calendar-event.service";
import { CreateCalendarEventDto } from "./dto/create-calendar-event.dto";
import { UpdateCalendarEventDto } from "./dto/update-calendar-event.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequest } from "@/@types";

@Controller("events/calendar")
@ApiTags("calendar-events")
export class CalendarEventController {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Post()
  @ApiOperation({ summary: "Create a new calendar event" })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: "The calendar event has been successfully created." })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(@Body() createCalendarEventDto: CreateCalendarEventDto, @Req() req: AuthRequest) {
    return this.calendarEventService.create(createCalendarEventDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get all calendar events" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "List of calendar events" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  findAll(@Req() req: AuthRequest) {
    return this.calendarEventService.findAll(req.user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a calendar event by ID" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The calendar event has been successfully retrieved." })
  @ApiResponse({ status: 404, description: "Calendar event not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  findOne(@Param("id") id: string, @Req() req: AuthRequest) {
    return this.calendarEventService.findOne(+id, req.user.id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a calendar event by ID" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The calendar event has been successfully updated." })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 404, description: "Calendar event not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  update(@Param("id") id: string, @Body() updateCalendarEventDto: UpdateCalendarEventDto) {
    return this.calendarEventService.update(+id, updateCalendarEventDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a calendar event by ID" })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "The calendar event has been successfully deleted." })
  @ApiResponse({ status: 404, description: "Calendar event not found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  remove(@Param("id") id: string) {
    return this.calendarEventService.remove(+id);
  }
}
