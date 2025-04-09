import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../entities/notification.entity";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { NotificationGateway } from "./notification.gateway";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private notificationGateway: NotificationGateway,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const user = await this.userRepo.findOne({ where: { id: createNotificationDto.userId } });
    if (!user) throw new NotFoundException("user not found");
    let notification = new Notification();
    notification.title = createNotificationDto.title;
    notification.content = createNotificationDto.content;
    notification.isRead = false;
    notification.metadata = createNotificationDto.metadata;
    notification.user = user;
    notification = await this.notificationRepo.save(notification);
    delete notification.user;
    await this.notificationGateway.emit(createNotificationDto.userId.toString(), notification);
    return true;
  }

  async findAll(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["notifications"],
    });
    if (!user) throw new NotFoundException("user not found");

    return user.notifications || [];
  }

  async read(id: number, userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["notifications"],
    });
    if (!user) throw new NotFoundException("user not found");
    const notification = user.notifications.find((notification) => notification.id === id);
    if (!notification) throw new NotFoundException("notification not found");
    notification.isRead = true;
    await this.notificationRepo.save(notification);
    return true;
  }

  async readAll(userId: number) {
    const notifications = await this.notificationRepo.find({ where: { user: { id: userId } } });
    const newNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));

    await this.notificationRepo.save(newNotifications);
    return true;
  }
}
