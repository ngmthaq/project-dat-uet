import { Module } from "@nestjs/common";
import { CoreModule } from "./@core/core.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { JobModule } from "./job/job.module";
import { MajorModule } from "./major/major.module";
import { SubjectModule } from "./subject/subject.module";
import { ClassModule } from "./class/class.module";

@Module({
  imports: [CoreModule, AuthModule, UserModule, JobModule, MajorModule, SubjectModule, ClassModule],
})
export class AppModule {}
