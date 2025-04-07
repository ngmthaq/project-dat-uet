import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { StudentReportStatus } from "../enums/student-report-status.enum";
import { Job } from "@/job/entities/job.entity";

@Entity()
export class StudentReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", nullable: true })
  public attachmentPath: Nullable<string>;

  @Column({ type: "enum", enum: StudentReportStatus, default: StudentReportStatus.InProgress })
  public status: StudentReportStatus;

  @Column({ type: "varchar", nullable: true })
  public score: Nullable<number>;

  @Column({ type: "varchar", nullable: true })
  public comment: Nullable<string>;

  @ManyToOne("Job", (job: Job) => job.studentReports)
  @JoinColumn()
  public job: Job;
}
