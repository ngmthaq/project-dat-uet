import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column()
  public username: string;

  @Column()
  public password: string;
}
