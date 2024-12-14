import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

@Injectable()
export class EncryptionService {
  public constructor(private configService: ConfigService) {}

  public async encrypt(plainText: string) {
    const iv = randomBytes(16);
    const secret = this.configService.get<string>("secret");
    const key = (await promisify(scrypt)(secret, "salt", 32)) as Buffer;
    const algorithm = this.configService.get<string>("algorithm");
    const cipher = createCipheriv(algorithm, key, iv);
    const hashedText = cipher.update(plainText);
    const final = cipher.final();
    const encryptedText = Buffer.concat([hashedText, final]);
    return { iv, key, encryptedText };
  }

  public async decrypt(encryptedText: Buffer, key: string, iv: string) {
    const algorithm = this.configService.get<string>("algorithm");
    const decipher = createDecipheriv(algorithm, key, iv);
    const decryptedText = decipher.update(encryptedText);
    const final = decipher.final();
    const plainText = Buffer.concat([decryptedText, final]);
    return plainText;
  }
}
