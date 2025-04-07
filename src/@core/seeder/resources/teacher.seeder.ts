import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Teacher } from "@/user/entities/teacher.entity";
import { Gender } from "@/user/enums/gender.enum";

@Injectable()
export class TeacherSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const teacherRepository = dataSource.getRepository(Teacher);
    const teachers = Array(5)
      .fill(null)
      .map(() => ({
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(Object.values(Gender)),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        birthday: faker.date.past({ years: 30 }),
        fax: faker.phone.number(),
        phoneNumber: faker.phone.number(),
        avatarPath: `public/uploads/${faker.string.uuid()}.png`,
      }));

    await teacherRepository.save(teachers);
  }
}
