import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogueService {
  getHello(): string {
    return 'Hello World!';
  }
}