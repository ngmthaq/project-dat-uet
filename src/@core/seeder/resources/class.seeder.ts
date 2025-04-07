import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Class } from "@/class/entities/class.entity";
import { faker } from "@faker-js/faker";
import { Subject } from "@/subject/entities/subject.entity";
import { Teacher } from "@/user/entities/teacher.entity";

@Injectable()
export class ClassSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const classRepository = dataSource.getRepository(Class);
    const subjectRepository = dataSource.getRepository(Subject);
    const teacherRepository = dataSource.getRepository(Teacher);

    const [subjects, teachers] = await Promise.all([
      subjectRepository.find(),
      teacherRepository.find(),
    ]);

    const classes = Array(20)
      .fill(null)
      .map(() => {
        const startDate = faker.date.soon({ days: 30 });
        return {
          classNo: `CS${faker.number.int({ min: 100, max: 499 })}`,
          room: `H${faker.number.int({ min: 100, max: 599 })}`,
          from: startDate,
          to: faker.date.soon({ days: 14, refDate: startDate }),
          duration: faker.number.int({ min: 1, max: 3 }),
          subject: faker.helpers.arrayElement(subjects),
          teacher: faker.helpers.arrayElement(teachers),
        };
      });

    await classRepository.save(classes);
  }
}
