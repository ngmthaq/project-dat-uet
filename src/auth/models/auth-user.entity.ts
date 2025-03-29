import { PartialType } from "@nestjs/swagger";
import { User } from "@/users/models/user.entity";

export class AuthUser extends PartialType(User) {}
