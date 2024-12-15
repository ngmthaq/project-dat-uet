import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { User } from "@/users/models/user.entity";
import { Gender } from "@/users/configs/gender.enum";
import { Role } from "@/users/configs/role.enum";

@Injectable()
export class UserSeeder {
  constructor(private readonly encryptionService: EncryptionService) {}
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const encryptedPassword1 = await this.encryptionService.encrypt("securepassword1");
    const encryptedPassword2 = await this.encryptionService.encrypt("securepassword2");
    const encryptedPassword3 = await this.encryptionService.encrypt("securepassword3");

    const users = [
      {
        username: "john_doe",
        name: "John Doe",
        password: encryptedPassword1,
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        avatarUrl: null,
        dob: new Date("1990-01-01"),
        gender: Gender.Male,
        role: Role.SuperAdmin,
        verifiedAt: new Date(),
      },
      {
        username: "jane_doe",
        name: "Jane Doe",
        password: encryptedPassword2,
        email: "jane.doe@example.com",
        phoneNumber: "0987654321",
        address: "456 Another St",
        avatarUrl: null,
        dob: new Date("1992-02-02"),
        gender: Gender.Female,
        role: Role.User,
        verifiedAt: new Date(),
      },
      {
        username: "josh_doe",
        name: "Josh Doe",
        password: encryptedPassword3,
        email: "josh.doe@example.com",
        phoneNumber: "0987654320",
        address: "789 Another St",
        avatarUrl: null,
        dob: new Date("1992-03-03"),
        gender: Gender.Other,
        role: Role.Admin,
        verifiedAt: new Date(),
      },
    ];

    await userRepository.clear();
    await userRepository.save(users);
  }
}
