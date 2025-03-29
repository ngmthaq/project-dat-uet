import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}
}
