import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "@/user/entities/user.entity";
import { Class } from "@/class/entities/class.entity";
import { Company } from "@/user/entities/company.entity";
import { Student } from "@/user/entities/student.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { SemesterEvent } from "@/semester-event/entities/semester-event.entity";
import { CalendarEvent } from "@/calendar-event/entities/calendar-event.entity";
import { Semester } from "@/major/entities/semester.entity";
import { Job } from "@/job/entities/job.entity";
import { StudentCv } from "@/user/entities/student-cv.entity";
import { StudentReport } from "@/user/entities/student-report.entity";
import { Major } from "@/major/entities/major.entity";

export const createDataSource = async (configService: ConfigService): Promise<DataSource> => {
  return new DataSource({
    type: configService.get<any>("database.type"),
    host: configService.get<string>("database.host"),
    port: configService.get<number>("database.port"),
    username: configService.get<string>("database.username"),
    password: configService.get<string>("database.password"),
    database: configService.get<string>("database.database"),
    entities: [
      Class,
      Company,
      Student,
      Subject,
      Teacher,
      User,
      SemesterEvent,
      CalendarEvent,
      Semester,
      Job,
      StudentCv,
      StudentReport,
      Major,
    ],
    synchronize: true,
  });
};
