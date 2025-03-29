import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Nullable } from "@/@types";
import { BaseEntity } from "@/@core/models/base.entity";
import { Gender } from "../configs/gender.enum";
import { Role } from "../configs/role.enum";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({ unique: true, nullable: true, type: "varchar" })
  public email: Nullable<string>;

  @Column({ unique: true, nullable: true, type: "varchar" })
  public phoneNumber: Nullable<string>;

  @Column({ nullable: true, type: "text" })
  public address: Nullable<string>;

  @Column({ nullable: true, type: "varchar" })
  public avatarUrl: Nullable<string>;

  @Column({ nullable: true, type: "date" })
  public dob: Nullable<Date>;

  @Column({ type: "enum", enum: Gender, default: Gender.Male })
  public gender: Gender;

  @Column({ type: "enum", enum: Role, default: Role.User })
  public role: Role;

  @Column({ nullable: true, type: "datetime" })
  public verifiedAt: Nullable<Date>;
}
