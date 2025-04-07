import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { faker } from "@faker-js/faker";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { Company } from "@/user/entities/company.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { Student } from "@/user/entities/student.entity";
import { Role } from "@/user/enums/role.enum";

@Injectable()
export class UserSeeder {
  constructor(private readonly encryptionService: EncryptionService) {}

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const companyRepository = dataSource.getRepository(Company);
    const teacherRepository = dataSource.getRepository(Teacher);
    const studentRepository = dataSource.getRepository(Student);

    const [companies, teachers, students] = await Promise.all([
      companyRepository.find(),
      teacherRepository.find(),
      studentRepository.find(),
    ]);

    const indexes = {
      company: 1,
      teacher: 1,
      student: 1,
    };

    const users = await Promise.all(
      Array(15)
        .fill(null)
        .map(async (_, index) => {
          let role: Role;
          switch (true) {
            case index % 3 === 0:
              role = Role.Company;
              break;
            case index % 2 === 0:
              role = Role.Teacher;
              break;
            default:
              role = Role.Student;
              break;
          }

          const baseUser = {
            email: faker.internet.email().toLowerCase(),
            password: await this.encryptionService.encrypt("12345678"),
            role: role,
          };

          switch (role) {
            case Role.Company:
              const company = companies[indexes.company - 1];
              indexes.company += 1;
              return { ...baseUser, company };
            case Role.Teacher:
              const teacher = teachers[indexes.teacher - 1];
              indexes.teacher += 1;
              return { ...baseUser, teacher };
            default:
              const student = students[indexes.student - 1];
              indexes.student += 1;
              return { ...baseUser, student };
          }
        }),
    );

    await userRepository.save(users);
  }
}
