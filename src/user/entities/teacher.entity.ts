import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nullable } from "@/@types";
import { BaseEntity } from "@/@core/models/base.entity";
import { Subject } from "@/subject/entities/subject.entity";
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

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  public subjects: Subject[];
}
