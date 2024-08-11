import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  ThrottlerModule as AppThrottlerModule,
  ThrottlerGuard,
} from '@nestjs/throttler';

@Module({
  imports: [
    AppThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 10,
      },
    ]),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppThrottlerModule],
})
export class ThrottlerModule {}
