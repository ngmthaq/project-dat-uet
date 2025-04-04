import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MulterModule } from "@nestjs/platform-express";
import { UserModule } from "@/user/user.module";
import { Company } from "@/user/entities/company.entity";
import { JobController } from "./job.controller";
import { JobService } from "./providers/job.service";
import { Job } from "./entities/job.entity";

@Module({
  imports: [MulterModule, TypeOrmModule.forFeature([Job, Company]), forwardRef(() => UserModule)],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
