import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SubjectCategories } from "../enums/subject-categories.enum";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  subjectNo: string;

  @Column({ type: "enum", enum: SubjectCategories, default: SubjectCategories.GENERAL })
  subjectCategory: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  englishName: string;

  @Column()
  numberOfCredits: number;
}
