import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "@/users/entities/user.entity";

export const createDataSource = async (configService: ConfigService): Promise<DataSource> => {
  return new DataSource({
    type: configService.get<any>("database.type"),
    host: configService.get<string>("database.host"),
    port: configService.get<number>("database.port"),
    username: configService.get<string>("database.username"),
    password: configService.get<string>("database.password"),
    database: configService.get<string>("database.database"),
    entities: [User],
    synchronize: true,
  });
};
