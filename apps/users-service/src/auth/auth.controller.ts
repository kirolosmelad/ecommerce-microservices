import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "@app/common";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern("create-user")
  public async createUser(@Payload() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
