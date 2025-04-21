import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Student } from "@/user/entities/student.entity";
import { Teacher } from "@/user/entities/teacher.entity";
import { Gender } from "@/user/enums/gender.enum";

@Injectable()
export class StudentSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const studentRepository = dataSource.getRepository(Student);
    const teacherRepository = dataSource.getRepository(Teacher);

    // Get existing teachers first
    const teachers = await teacherRepository.find();

    const students = Array(5)
      .fill(null)
      .map(() => ({
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(Object.values(Gender)),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        birthday: faker.date.between({
          from: "2000-01-01",
          to: "2005-01-01",
        }),
        className: `K${faker.number.int({ min: 50, max: 60 })}S${faker.number.int({ min: 1, max: 3 })}`,
        phoneNumber: faker.phone.number(),
        avatarPath: null,
        teacher: faker.helpers.arrayElement(teachers),
      }));

    await studentRepository.save(students);
  }
}
