import { Injectable } from "@nestjs/common";
import { User } from "../models/user.entity";

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
