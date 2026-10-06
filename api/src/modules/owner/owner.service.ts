import { Injectable } from '@nestjs/common';
import { DbService } from '../../database/db.service'
import { owner } from '../../database/schema'
import { eq } from 'drizzle-orm'

@Injectable()
export class OwnerService {
  constructor(private readonly db: DbService){}

  findByEmail(email: string) {
    return this.db.db.select({
                id: owner.id
                , email: owner.email
                , passwordHash: owner.passwordHash
            })
            .from(owner)
            .where(eq(owner.email, email))
  }

}
