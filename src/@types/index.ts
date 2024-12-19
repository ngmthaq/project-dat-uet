import { Request } from "express";
import { AuthUser } from "@/auth/models/auth-user.entity";

export type Nullable<T> = T | null;

export type AuthRequest = Request & {
  user: AuthUser;
};
