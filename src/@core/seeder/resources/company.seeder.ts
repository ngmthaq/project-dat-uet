import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { faker } from "@faker-js/faker";
import { Company } from "@/user/entities/company.entity";
import { CompanyType } from "@/user/enums/company-type.enum";

@Injectable()
export class CompanySeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const companyRepository = dataSource.getRepository(Company);
    const companies = Array(5)
      .fill(null)
      .map(() => ({
        name: faker.company.name(),
        address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
        phoneNumber: faker.phone.number(),
        description: faker.lorem.paragraphs(3),
        type: faker.helpers.arrayElement(Object.values(CompanyType)),
        domain: faker.internet.domainWord().toUpperCase(),
        website: faker.internet.url(),
        logoPath: `public/uploads/${faker.string.uuid()}.png`,
      }));

    await companyRepository.save(companies);
  }
}
