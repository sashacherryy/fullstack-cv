import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DbModule } from '../../database/db.module'
import { ContactsModule } from '../contacts/contacts.module'

@Module({
  imports: [
    DbModule
   , ContactsModule 
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
