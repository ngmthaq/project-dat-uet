import { PartialType } from "@nestjs/swagger";
import { User } from "@/users/entities/user.entity";

export class AuthUser extends PartialType(User) {}
