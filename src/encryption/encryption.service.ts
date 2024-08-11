import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  async encrypt(plainText: string) {
    const iv = randomBytes(16);
    const secret = this.configService.get<string>('secret');
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(plainText),
      cipher.final(),
    ]);

    return { iv, key, encryptedText };
  }

  async decrypt(encryptedText: Buffer, key: string, iv: string) {
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText;
  }
}
