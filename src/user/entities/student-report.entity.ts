import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { StudentReportStatus } from "../enums/student-report-status.enum";
import { Job } from "@/job/entities/job.entity";
import { Student } from "./student.entity";

@Entity()
export class StudentReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", nullable: true })
  public attachmentPath: Nullable<string>;

  @Column({ type: "enum", enum: StudentReportStatus, default: StudentReportStatus.Pending })
  public status: StudentReportStatus;

  @Column({ type: "varchar", nullable: true })
  public score: Nullable<number>;

  @Column({ type: "varchar", nullable: true })
  public comment: Nullable<string>;

  @ManyToOne("Job", (job: Job) => job.studentReports)
  @JoinColumn()
  public job: Job;

  @OneToOne("Student", (student: Student) => student.studentReport, { nullable: true })
  public student: Nullable<StudentReport>;
}
