import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { EncryptionService } from "../encryption/encryption.service";
import { createDataSource } from "./data-source";
import { SeederModule } from "./seeder.module";
import { UserSeeder } from "./resources/user.seeder";

async function runSeeder() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const configService = app.get(ConfigService);
  const encryptionService = app.get(EncryptionService);

  const dataSource = await createDataSource(configService);
  await dataSource.initialize();

  const userSeeder = new UserSeeder(encryptionService);
  await userSeeder.run(dataSource);

  console.log("Seeding completed");
  await app.close();
  process.exit(0);
}

runSeeder().catch((error) => {
  console.error("Error during seeding", error);
  process.exit(1);
});
