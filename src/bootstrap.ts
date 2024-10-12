import { NestFactory, repl } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { useContainer } from "class-validator";
import { LoggerService } from "./logger/logger.service";
import { AppModule } from "./app.module";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(helmet());
  app.use(cookieParser());
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.HEADER, header: "version" });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const documentBuilder = new DocumentBuilder();
  documentBuilder.setTitle("Nest.js");
  documentBuilder.setDescription("The API Description");
  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup("swagger", app, document);
  await app.listen(process.env.APP_PORT);
}

export async function bootstrapRepl() {
  await repl(AppModule);
}
