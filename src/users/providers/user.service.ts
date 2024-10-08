import { Injectable } from "@nestjs/common";
import { User } from "../models/user.entity";

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: "john",
      password: "password",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
    },
  ];

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
