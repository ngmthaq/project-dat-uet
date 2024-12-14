import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashingService {
  public async make(plainText: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(plainText, salt);
    return hash;
  }

  public async check(plainText: string, hash: string) {
    return bcrypt.compare(plainText, hash);
  }
}
