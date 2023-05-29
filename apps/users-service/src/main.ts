import { NestFactory } from "@nestjs/core";
import { UsersServiceModule } from "./users-service.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE_GROUP } from "@app/common";
import { ValidationPipe } from "@nestjs/common";
import { logLevel } from "@nestjs/microservices/external/kafka.interface";

(async () => {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ["localhost:9092"],
          logLevel: logLevel.ERROR,
        },
        consumer: {
          groupId: AUTH_SERVICE_GROUP,
        },
      },
    }
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
})();
