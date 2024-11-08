import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.setGlobalPrefix("auth");

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
