import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { ThrottlerModule } from "./throttler/throttler.module";
import { DatabaseModule } from "./database/database.module";
import { EncryptionModule } from "./encryption/encryption.module";
import { HashingModule } from "./hashing/hashing.module";
import { StaticModule } from "./static/static.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { LoggerModule } from "./logger/logger.module";

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    DatabaseModule,
    EncryptionModule,
    HashingModule,
    StaticModule,
    ScheduleModule,
    LoggerModule,
  ],
  exports: [
    ConfigModule,
    ThrottlerModule,
    DatabaseModule,
    EncryptionModule,
    HashingModule,
    StaticModule,
    ScheduleModule,
    LoggerModule,
  ],
})
export class CoreModule {}
