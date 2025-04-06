import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nullable } from "@/@types";
import { BaseEntity } from "@/@core/models/base.entity";
import { Subject } from "@/subject/entities/subject.entity";
import { Class } from "@/class/entities/class.entity";
import { Gender } from "../enums/gender.enum";

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "enum", enum: Gender, default: Gender.Male })
  public gender: Gender;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "datetime" })
  public birthday: Date;

  @Column({ type: "varchar" })
  public fax: string;

  @Column({ type: "varchar" })
  public phoneNumber: string;

  @Column({ type: "varchar", nullable: true })
  public avatarPath: Nullable<string>;

  @ManyToMany("Subject", (subject: Subject) => subject.teachers)
  public subjects: Subject[];

  @OneToMany("Class", (classes: Class) => classes.teacher)
  classes: Class[];
}
