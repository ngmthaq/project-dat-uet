import { Module } from "@nestjs/common";
import { CoreModule } from "./@core/core.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JobModule } from "./job/job.module";

@Module({
  imports: [CoreModule, AuthModule, UserModule, JobModule],
})
export class AppModule {}
