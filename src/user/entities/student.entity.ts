import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { Gender } from "../enums/gender.enum";
import { StudentReport } from "./student-report.entity";
import { StudentCv } from "./student-cv.entity";
import { User } from "./user.entity";

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "int", nullable: true, default: null })
  public teacherId: Nullable<number>;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "enum", enum: Gender, default: Gender.Male })
  public gender: Gender;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "datetime" })
  public birthday: Date;

  @Column({ type: "varchar" })
  public className: string;

  @Column({ type: "varchar" })
  public phoneNumber: string;

  @Column({ type: "varchar", nullable: true })
  public avatarPath: Nullable<string>;

  @OneToOne("StudentReport", (report: StudentReport) => report.student, { nullable: true })
  @JoinColumn()
  public studentReport: Nullable<StudentReport>;

  @OneToMany("StudentCv", (studentCv: StudentCv) => studentCv.student)
  @JoinColumn()
  public studentCvs: StudentCv[];

  @OneToOne("User", (user: User) => user.student)
  public user: User;
}
