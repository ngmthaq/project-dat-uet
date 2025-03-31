import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/@core/models/base.entity";

@Entity()
export class StudentCv extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public studentId: number;

  @Column({ type: "varchar" })
  public cvPath: string;
}
