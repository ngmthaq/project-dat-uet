import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Semester } from "@/major/entities/semester.entity";
import { SubjectCategories } from "../enums/subject-categories.enum";
import { Teacher } from "@/user/entities/teacher.entity";
import { Class } from "@/class/entities/class.entity";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  subjectNo: string;

  @Column({ type: "enum", enum: SubjectCategories, default: SubjectCategories.GENERAL })
  subjectCategory: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  englishName: string;

  @Column()
  numberOfCredits: number;

  @ManyToMany(() => Semester, (semester) => semester.subjects)
  @JoinTable()
  semesters: Semester[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  @JoinTable()
  teachers: Teacher[];

  @OneToMany("Class", (classes: Class) => classes.subject)
  classes: Class[];
}
