import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Learning Microservices")
    .setDescription(
      "This project is created to learn basics of microservices using nestjs"
    )
    .setVersion("1.0")
    .addServer("http://localhost:3000") //TODO : add it from env file
    .addBearerAuth(
      {
        description: "JWT token to access app",
        type: "http",
        scheme: "Bearer",
        name: "Authorization",
        bearerFormat: "Bearer",
        in: "Header",
      },
      "JwtToken"
    )
    // .addBasicAuth(
    //   { type: "apiKey", name: "accessToken", in: "Header" },
    //   "ApiKey"
    // )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
};
