import { Injectable } from '@nestjs/common';
import { DbService } from '../../database/db.service'
import { contacts } from '../../database/schema'
import { eq, asc } from 'drizzle-orm'

@Injectable()
export class ContactsService {
    constructor(private readonly db: DbService){}

    findByProfileId(profileId: number) {
        return this.db.db.select({
                    id: contacts.id,
                    name: contacts.name,
                    url: contacts.url
                })
                .from(contacts)
                .where(eq(contacts.profileId, profileId))
                .orderBy(asc(contacts.id))
    }

}
