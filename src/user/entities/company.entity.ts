import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { CompanyType } from "../enums/company-type.enum";

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "varchar" })
  public address: string;

  @Column({ type: "varchar" })
  public phoneNumber: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "enum", enum: CompanyType, default: CompanyType.External })
  public type: CompanyType;

  @Column({ type: "varchar" })
  public domain: string;

  @Column({ type: "varchar" })
  public website: string;

  @Column({ type: "varchar", nullable: true })
  public logoPath: Nullable<string>;
}
