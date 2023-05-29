import {
  AUTH_CLIENT,
  AUTH_SERVICE,
  AUTH_SERVICE_GROUP,
  KafkaModule,
} from "@app/common";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    KafkaModule.registerService(
      AUTH_SERVICE,
      AUTH_CLIENT,
      AUTH_SERVICE_GROUP,
      true
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
