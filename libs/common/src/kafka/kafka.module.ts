import { DynamicModule, Module } from "@nestjs/common";
import { ClientKafka, ClientsModule, Transport } from "@nestjs/microservices";
import { logLevel } from "@nestjs/microservices/external/kafka.interface";

@Module({})
export class KafkaModule {
  static registerService(
    serviceName: string,
    clientId: string,
    groupId: string,
    producerOnly: boolean = false
  ): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: serviceName,
            transport: Transport.KAFKA,
            options: {
              producerOnlyMode: producerOnly,
              client: {
                clientId: clientId,
                brokers: ["localhost:9092"],
                logLevel: logLevel.ERROR,
              },
              consumer: { groupId, allowAutoTopicCreation: true },
            },
          },
        ]),
      ],
      providers: [ClientKafka],
      exports: [ClientsModule, ClientKafka],
    };
  }
}
