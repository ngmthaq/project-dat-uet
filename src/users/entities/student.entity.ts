import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { Gender } from "../enums/gender.enum";
import { StudentCv } from "./student-cv.entity";
import { StudentReport } from "./student-report.entity";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column()
  public majorId: number;

  @Column()
  public teacherId: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "enum", enum: Gender, default: Gender.Male })
  public gender: Gender;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "datetime" })
  public birthday: string;

  @Column({ type: "varchar" })
  public className: string;

  @Column({ type: "varchar" })
  public phoneNumber: string;

  @Column({ type: "varchar", nullable: true })
  public avatarPath: Nullable<string>;

  @OneToMany(() => StudentCv, (cv) => cv.studentId, { cascade: true, nullable: true })
  public studentCvs: StudentCv[];

  @OneToOne(() => StudentReport, (report) => report.studentId, { cascade: true, nullable: true })
  public studentReport: Nullable<StudentReport>;
}
