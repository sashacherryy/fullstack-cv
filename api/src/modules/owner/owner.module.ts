import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { DbModule } from '../../database/db.module'

@Module({
  imports: [DbModule]
  , controllers: [OwnerController]
  , providers: [OwnerService]
  , exports: [OwnerService]
})
export class OwnerModule {}
