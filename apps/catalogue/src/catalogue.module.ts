import { Module } from '@nestjs/common';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from './catalogue.service';

@Module({
  imports: [],
  controllers: [CatalogueController],
  providers: [CatalogueService],
})
export class CatalogueModule {}