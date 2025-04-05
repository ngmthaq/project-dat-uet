import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";
import { Semester } from "./semester.entity";

@Entity()
export class Major extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public majorNo: string;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "varchar" })
  public englishName: string;

  @Column({ type: "varchar" })
  public degreeName: string;

  @Column({ type: "text" })
  public knowledge: string;

  @Column({ type: "text" })
  public attitude: string;

  @Column({ type: "text" })
  public skills: string;

  @Column({ type: "text" })
  public careerPath: string;

  @Column({ type: "text" })
  public higherEducation: string;

  @OneToMany("Semester", (semester: Semester) => semester.major)
  @JoinColumn()
  public semesters: Semester[];
}
