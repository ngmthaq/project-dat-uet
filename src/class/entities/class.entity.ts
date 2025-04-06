import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { SemesterEvent } from "@/semester-event/entities/semester-event.entity";

@Entity()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  classNo: string;

  @Column({ type: "varchar" })
  room: string;

  @Column({ type: "date" })
  from: Date;

  @Column({ type: "date" })
  to: Date;

  @Column()
  duration: number;

  @ManyToOne(() => Subject, (subject) => subject.classes)
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  @JoinColumn()
  teacher: Teacher;

  @ManyToMany(() => SemesterEvent, (semesterEvent) => semesterEvent.classes)
  @JoinTable()
  semesterEvents: SemesterEvent[];
}
