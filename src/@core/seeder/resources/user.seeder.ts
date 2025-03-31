import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { User } from "@/users/entities/user.entity";
// import { Gender } from "@/users/enums/gender.enum";
// import { Role } from "@/users/enums/role.enum";

@Injectable()
export class UserSeeder {
  constructor(private readonly encryptionService: EncryptionService) {}
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    // const encryptedPassword1 = await this.encryptionService.encrypt("securepassword1");
    // const encryptedPassword2 = await this.encryptionService.encrypt("securepassword2");
    // const encryptedPassword3 = await this.encryptionService.encrypt("securepassword3");

    const users = [];

    await userRepository.clear();
    await userRepository.save(users);
  }
}
