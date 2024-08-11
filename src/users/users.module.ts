import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from './users.service';
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
  ],
  exports: [UsersService],
})
export class UsersModule {}
