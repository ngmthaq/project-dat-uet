import { forwardRef, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "@/@core/logger/logger.module";
import { EncryptionModule } from "@/@core/encryption/encryption.module";
import { MulterModule } from "@/@core/multer/multer.module";
import { AuthModule } from "@/auth/auth.module";
import { Job } from "@/job/entities/job.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { UserController } from "./user.controller";
import { UserService } from "./providers/user.service";
import { RoleGuard } from "./providers/role.guard";
import { UserGateway } from "./providers/user.gateway";
import { UserSchedule } from "./providers/user.schedule";
import { EmailExistedRule } from "./providers/email-existed.rule";
import { User } from "./entities/user.entity";
import { Student } from "./entities/student.entity";
import { Teacher } from "./entities/teacher.entity";
import { Company } from "./entities/company.entity";
import { StudentCv } from "./entities/student-cv.entity";
import { StudentReport } from "./entities/student-report.entity";
import { SemesterEvent } from "@/semester-event/entities/semester-event.entity";
import { CalendarEvent } from "@/calendar-event/entities/calendar-event.entity";
import { Notification } from "@/notification/entities/notification.entity";
import { NotificationModule } from "@/notification/notification.module";

const GlobalUserGuard = { provide: APP_GUARD, useClass: RoleGuard };

@Module({
  imports: [
    LoggerModule,
    EncryptionModule,
    MulterModule,
    TypeOrmModule.forFeature([
      User,
      Student,
      Teacher,
      Company,
      StudentCv,
      StudentReport,
      Job,
      Subject,
      SemesterEvent,
      CalendarEvent,
      Notification,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => NotificationModule),
  ],
  controllers: [UserController],
  providers: [GlobalUserGuard, UserGateway, UserSchedule, UserService, EmailExistedRule],
  exports: [UserService],
})
export class UserModule {}
