import { CreateUserDto } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
  //#region
  public async createUser(createUserDto: CreateUserDto) {
    console.log("User Received ", createUserDto);
  }
  //#endregion
}
