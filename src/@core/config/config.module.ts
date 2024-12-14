import { Module } from "@nestjs/common";
import { ConfigModule as AppConfigModule } from "@nestjs/config";
import configuration from "./configuration";

@Module({
  imports: [
    AppConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  exports: [AppConfigModule],
})
export class ConfigModule {}
