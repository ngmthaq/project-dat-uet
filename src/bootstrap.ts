import { NestFactory, repl } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors();
  app.setGlobalPrefix("api");
  app.enableVersioning({ type: VersioningType.HEADER, header: "version" });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
