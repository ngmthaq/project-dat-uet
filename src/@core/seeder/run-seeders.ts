import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { EncryptionService } from "../encryption/encryption.service";
import { createDataSource } from "./data-source";
import { SeederModule } from "./seeder.module";
import { UserSeeder } from "./resources/user.seeder";
import { CompanySeeder } from "./resources/company.seeder";
import { TeacherSeeder } from "./resources/teacher.seeder";
import { SubjectSeeder } from "./resources/subject.seeder";
import { ClassSeeder } from "./resources/class.seeder";
import { StudentSeeder } from "./resources/student.seeder";

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const configService = app.get(ConfigService);
  const encryptionService = app.get(EncryptionService);

  const dataSource = await createDataSource(configService);
  await dataSource.initialize();

  console.log("Seeding company...");
  const companySeeder = new CompanySeeder();
  await companySeeder.run(dataSource);
  console.log("Seeding company completed");

  console.log("Seeding teacher...");
  const teacherSeeder = new TeacherSeeder();
  await teacherSeeder.run(dataSource);
  console.log("Seeding teacher completed");

  console.log("Seeding student...");
  const studentSeeder = new StudentSeeder();
  await studentSeeder.run(dataSource);
  console.log("Seeding student completed");

  console.log("Seeding subject...");
  const subjectSeeder = new SubjectSeeder();
  await subjectSeeder.run(dataSource);
  console.log("Seeding subject completed");

  console.log("Seeding class...");
  const classSeeder = new ClassSeeder();
  await classSeeder.run(dataSource);
  console.log("Seeding class completed");

  console.log("Seeding user...");
  const userSeeder = new UserSeeder(encryptionService);
  await userSeeder.run(dataSource);
  console.log("Seeding user completed");
  console.log("Seeding completed");

  await app.close();
  process.exit(0);
}

runSeeder().catch((error) => {
  console.error("Error during seeding", error);
  process.exit(1);
});
