import { Class } from "@/class/entities/class.entity";
import { User } from "@/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SemesterEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  from: Date;

  @Column({ type: "date" })
  to: Date;

  @Column({ type: "text" })
  title: string;

  @ManyToMany(() => Class, (classEntity) => classEntity.semesterEvents)
  classes: Class[];

  @ManyToOne(() => User, (user) => user.semesterEvents)
  @JoinColumn()
  user: User;
}
