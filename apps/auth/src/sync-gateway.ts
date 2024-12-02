import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { RouteRegisterService } from "./route-register.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AuthModule);
  const routeRegisterService = app.get(RouteRegisterService);

  // must add routeRegisterService in auth module
  // must import discovery module in auth module

  // Trigger the route extraction and syncing logic
  await routeRegisterService.onModuleInit();

  await app.close();
}

bootstrap().catch((err) => {
  console.error("Error syncing routes with Kong:", err);
  process.exit(1);
});
