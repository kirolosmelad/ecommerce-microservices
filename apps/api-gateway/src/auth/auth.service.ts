import { AUTH_SERVICE, CreateUserDto } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientKafka) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.authClient.emit("create-user", JSON.stringify(createUserDto));
  }
}
