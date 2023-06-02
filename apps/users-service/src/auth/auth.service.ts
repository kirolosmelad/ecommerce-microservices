import { CreateUserDto } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
  //#region
  public async createUser(createUserDto: CreateUserDto) {
    return {
      success: true,
      data: {
        id: 1,
        ...createUserDto,
      },
    };
  }
  //#endregion
}
