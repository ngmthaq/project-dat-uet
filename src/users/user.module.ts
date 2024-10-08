import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./providers/user.service";
import { RoleGuard } from "./providers/role.guard";
import { UserGateway } from "./providers/user.gateway";
import { UserSchedule } from "./providers/user.schedule";
import { UserRepository } from "./providers/user.repository";
import { User } from "./models/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    { provide: APP_GUARD, useClass: RoleGuard },
    UserGateway,
    UserSchedule,
    UserRepository,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
