import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { EncryptionModule } from "../encryption/encryption.module";

@Module({
  imports: [ConfigModule, EncryptionModule],
})
export class SeederModule {}
