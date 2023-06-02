import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { logLevel } from "@nestjs/microservices/external/kafka.interface";

export interface Options {
  serviceName: string;
  clientId: string;
  groupId: string;
  producerOnly?: boolean;
}

@Module({})
export class KafkaModule {
  static registerService(options: Options): DynamicModule {
    return ClientsModule.registerAsync({
      clients: [
        {
          name: options.serviceName,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            console.log(
              `Connecting broker .. ${[
                configService.get<string>("KAFKA_BROKER"),
              ]}`
            );

            return {
              name: options.serviceName,
              transport: Transport.KAFKA,
              options: {
                producerOnlyMode: options?.producerOnly ?? false,
                client: {
                  clientId: options.clientId,
                  brokers: [configService.get<string>("KAFKA_BROKER")],
                  logLevel: logLevel.ERROR,
                },
                consumer: {
                  groupId: options.groupId,
                  allowAutoTopicCreation: true,
                },
              },
            };
          },
        },
      ],
    });
  }
}
