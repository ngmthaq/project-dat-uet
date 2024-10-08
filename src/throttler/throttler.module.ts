import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule as AppThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

@Module({
  imports: [
    AppThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>("throttler.ttl"),
            limit: configService.get<number>("throttler.limit"),
          },
        ],
      }),
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppThrottlerModule],
})
export class ThrottlerModule {}
