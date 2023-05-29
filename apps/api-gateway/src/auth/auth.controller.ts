import { CreateUserDto } from "@app/common";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  public async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
