import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { StudentReportStatus } from "../enums/student-report-status.enum";

@Entity()
export class StudentReport extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar", nullable: true })
  public attachmentPath: Nullable<string>;

  @Column({ type: "enum", enum: StudentReportStatus, default: StudentReportStatus.InProgress })
  public coverLetterPath: string;

  @Column({ type: "varchar", nullable: true })
  public score: Nullable<number>;

  @Column({ type: "varchar", nullable: true })
  public comment: Nullable<number>;
}
