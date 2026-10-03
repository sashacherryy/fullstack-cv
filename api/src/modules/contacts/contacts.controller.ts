import { Controller, Get , Param, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';


@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':profileId')
  findByProfileId(@Param('profileId', ParseIntPipe) profileId: number){
    return this.contactsService.findByProfileId(profileId)
  }

}
