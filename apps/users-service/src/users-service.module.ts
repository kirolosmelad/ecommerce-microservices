import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../../../.env`,
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class UsersServiceModule {}
