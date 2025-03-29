import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../models/user.entity";

@Injectable()
export class UserRepository {
  public constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public findById(id: number, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({ where: { id }, withDeleted });
  }

  public findByEmail(email: string, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({ where: { email }, withDeleted });
  }

  public findByUsername(username: string, withDeleted: boolean = false): Promise<User | null> {
    return this.userRepo.findOne({ where: { username }, withDeleted });
  }
}
