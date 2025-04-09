import { forwardRef, Module } from "@nestjs/common";
import { NotificationService } from "./providers/notification.service";
import { NotificationController } from "./notification.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { User } from "@/user/entities/user.entity";
import { AuthModule } from "@/auth/auth.module";
import { ConfigModule } from "@/@core/config/config.module";
import { EncryptionModule } from "@/@core/encryption/encryption.module";
import { NotificationGateway } from "./providers/notification.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]),
    forwardRef(() => AuthModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => EncryptionModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
