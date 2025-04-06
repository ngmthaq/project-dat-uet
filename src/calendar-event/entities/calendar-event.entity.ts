import { BaseEntity } from "@/@core/models/base.entity";
import { User } from "@/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CalendarEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  from: Date;

  @Column({ type: "date" })
  to: Date;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne("User", (user: User) => user.calendarEvents)
  @JoinColumn()
  user: User;
}
