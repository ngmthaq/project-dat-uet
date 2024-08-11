import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ThrottlerModule } from './throttler/throttler.module';
import { DatabaseModule } from './database/database.module';
import { EncryptionModule } from './encryption/encryption.module';
import { HashingModule } from './hashing/hashing.module';
import { StaticModule } from './static/static.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule,
    DatabaseModule,
    EncryptionModule,
    HashingModule,
    StaticModule,
    ScheduleModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
