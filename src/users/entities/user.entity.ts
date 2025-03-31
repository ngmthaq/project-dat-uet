import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { Role } from "../enums/role.enum";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
import { Company } from "./company.entity";

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

  @OneToOne(() => Student, (student) => student.userId, { cascade: true, nullable: true })
  public student: Nullable<Student>;

  @OneToOne(() => Teacher, (teacher) => teacher.userId, { cascade: true, nullable: true })
  public teacher: Nullable<Teacher>;

  @OneToOne(() => Company, (company) => company.userId, { cascade: true, nullable: true })
  public company: Nullable<Company>;
}
