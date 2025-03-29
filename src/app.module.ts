import { Module } from "@nestjs/common";
import { CoreModule } from "./@core/core.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";

@Module({
  imports: [CoreModule, AuthModule, UserModule],
})
export class AppModule {}
