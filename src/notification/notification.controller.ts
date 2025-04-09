import { Controller, Get, Patch, Param, Req } from "@nestjs/common";
import { NotificationService } from "./providers/notification.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthRequest } from "@/@types";

@Controller("notifications")
@ApiTags("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all notifications" })
  @ApiResponse({ status: 200, description: "Notifications retrieved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  findAll(@Req() req: AuthRequest) {
    return this.notificationService.findAll(req.user.id);
  }

  @Patch("all")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark all notifications as read" })
  @ApiResponse({ status: 200, description: "All notifications marked as read successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  readAll(@Req() req: AuthRequest) {
    return this.notificationService.readAll(req.user.id);
  }

  @Patch(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark notification as read" })
  @ApiResponse({ status: 200, description: "Notification marked as read successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Notification not found" })
  read(@Param("id") id: string, @Req() req: AuthRequest) {
    return this.notificationService.read(+id, req.user.id);
  }
}
