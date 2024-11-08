import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  getHello(): string {
    console.log("TESTINGGG ");

    return "Hello From Auth!";
  }
}
