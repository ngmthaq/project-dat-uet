import { User } from "@/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "boolean", default: false })
  isRead: boolean;

  @Column({ type: "text" })
  metadata: string;

  @ManyToOne("User", (user: User) => user.notifications)
  user: User;
}
