import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { Role } from "../enums/role.enum";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
import { Company } from "./company.entity";
import { SemesterEvent } from "@/semester-event/entities/semester-event.entity";
import { CalendarEvent } from "@/calendar-event/entities/calendar-event.entity";
import { Notification } from "@/notification/entities/notification.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public password: string;

  @Column({ unique: true, type: "varchar" })
  public email: string;

  @Column({ type: "enum", enum: Role, default: Role.Student })
  public role: Role;

  @OneToOne("Student", { nullable: true })
  @JoinColumn()
  public student: Nullable<Student>;

  @OneToOne("Teacher", { nullable: true })
  @JoinColumn()
  public teacher: Nullable<Teacher>;

  @OneToOne("Company", { nullable: true })
  @JoinColumn()
  public company: Nullable<Company>;

  @OneToMany("SemesterEvent", (semesterEvent: SemesterEvent) => semesterEvent.user)
  @JoinColumn()
  public semesterEvents: SemesterEvent[];

  @OneToMany("CalendarEvent", (calendarEvent: CalendarEvent) => calendarEvent.user)
  @JoinColumn()
  public calendarEvents: CalendarEvent[];

  @OneToMany("Notification", (notification: Notification) => notification.user)
  @JoinColumn()
  public notifications: Notification[];
}
