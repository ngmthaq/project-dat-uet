import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Major } from "./major.entity";

@Entity()
export class Semester extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public year: string;

  @Column({ type: "varchar" })
  public period: string;

  @ManyToOne("Major", (major: Major) => major.semesters)
  @JoinColumn()
  public major: Major;
}
