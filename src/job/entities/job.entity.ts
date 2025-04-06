import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Nullable } from "@/@types";
import { Company } from "@/user/entities/company.entity";

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public title: string;

  @Column({ type: "varchar" })
  public content: string;

  @Column({ type: "varchar", nullable: true })
  public coverPath: Nullable<string>;

  @Column({ type: "datetime" })
  public from: Date;

  @Column({ type: "datetime" })
  public to: Date;

  @ManyToOne("Company", (company: Company) => company.jobs)
  @JoinColumn()
  public company: Company;
}
