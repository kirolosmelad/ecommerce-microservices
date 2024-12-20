import { NestFactory } from "@nestjs/core";
import { UsersModule } from "./users.module";

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.setGlobalPrefix("users");

  await app.listen(3002);
}
bootstrap();
