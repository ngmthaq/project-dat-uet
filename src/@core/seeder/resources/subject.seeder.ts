import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Subject } from "@/subject/entities/subject.entity";
import { faker } from "@faker-js/faker";
import { SubjectCategories } from "@/subject/enums/subject-categories.enum";

@Injectable()
export class SubjectSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const subjectRepository = dataSource.getRepository(Subject);
    const subjects = Array(15)
      .fill(null)
      .map(() => ({
        subjectNo: `SUBJ${faker.number.int({ min: 100, max: 999 })}`,
        subjectCategory: faker.helpers.arrayElement(Object.values(SubjectCategories)),
        name: faker.company.buzzNoun(),
        englishName: faker.company.buzzPhrase(),
        numberOfCredits: faker.number.int({ min: 1, max: 4 }),
      }));

    await subjectRepository.save(subjects);
  }
}
