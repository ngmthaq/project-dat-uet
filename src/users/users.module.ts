import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from './users.service';
import { UserScheduleService } from './user-schedule.service';
import { UsersController } from './users.controller';
import { RolesGuard } from './roles.guard';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UsersService,
    UserScheduleService,
  ],
  exports: [UsersService, UserScheduleService],
})
export class UsersModule {}
