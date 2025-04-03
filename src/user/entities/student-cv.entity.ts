import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Student } from "./student.entity";

@Entity()
export class StudentCv extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public cvPath: string;

  @ManyToOne(() => Student, (student) => student.studentCvs)
  @JoinColumn()
  public student: Student;
}
