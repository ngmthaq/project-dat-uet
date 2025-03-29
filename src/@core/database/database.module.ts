import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "../config/config.module";
import { DatabaseLogger } from "./database.logger";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>("database.type"),
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.database"),
        autoLoadEntities: true,
        synchronize: true,
        logger: new DatabaseLogger(),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
