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
    const encryptedText = Buffer.concat([hashedText, final]).toString("hex");
    const combined = `${iv.toString("hex")}.${key.toString("hex")}.${encryptedText}`;
    return combined;
  }

  public async decrypt(combined: string) {
    const algorithm = this.configService.get<string>("algorithm");
    const [ivHex, keyHex, encryptedTextHex] = combined.split(".");
    const key = Buffer.from(keyHex, "hex");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedTextHex, "hex");
    const decipher = createDecipheriv(algorithm, key, iv);
    const decryptedText = decipher.update(encryptedText);
    const final = decipher.final();
    const plainText = Buffer.concat([decryptedText, final]);
    return plainText.toString();
  }
}
