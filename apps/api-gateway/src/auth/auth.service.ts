import { AUTH_SERVICE, CreateUserDto } from "@app/common";
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientKafka) {}

  public createUser(createUserDto: CreateUserDto) {
    return this.authClient
      .send("create-user", JSON.stringify(createUserDto))
      .pipe<CreateUserDto & { id: number }>(
        map<CreateUserDto & { id: number }, CreateUserDto & { id: number }>(
          (response) => response
        )
      );
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf("create-user");
    await this.authClient.connect();
  }

  async onModuleDestroy() {
    await this.authClient.close();
  }
}
