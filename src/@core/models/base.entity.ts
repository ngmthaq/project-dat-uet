import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Nullable } from "@/@types";

export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Nullable<Date>;
}
