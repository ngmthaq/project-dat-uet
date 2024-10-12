import { SetMetadata } from "@nestjs/common";

export const SKIP_AUTH_KEY = "SKIP_AUTH_KEY";
export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
