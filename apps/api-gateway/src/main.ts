import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { initSwagger } from "@app/common";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  initSwagger(app);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>("PORT");

  console.log(port);

  await app.listen(port);
})();
