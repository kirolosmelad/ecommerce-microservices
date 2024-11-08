import { Controller, Get, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("check/hello")
  getHello(): string {
    return this.authService.getHello();
  }

  @Get("users/:userId")
  public async getUserById(@Param("userId") userId: string) {
    console.log("HII");

    return {
      id: userId,
      name: "Keroo el fagerrr",
    };
  }
}
