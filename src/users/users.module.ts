import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesGuard } from './roles.guard';
import { UsersGateway } from './users.gateway';
import { ScheduleService } from './schedule.service';
import { UsersRepositoryService } from './users.repository.service';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UsersService,
    UsersGateway,
    ScheduleService,
    UsersRepositoryService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
