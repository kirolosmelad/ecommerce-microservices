import { NestFactory } from "@nestjs/core";
import { OrdersModule } from "./orders.module";

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  app.setGlobalPrefix("orders");

  await app.listen(3001);
}
bootstrap();
