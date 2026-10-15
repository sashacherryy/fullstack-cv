import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../../database/db.service'
import { owner } from '../../database/schema'
import { eq } from 'drizzle-orm'
import verifyPassword from '../../common/func/verifyPassword'
import hashPassword from '../../common/func/hashPassword';


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

  findById(id: number) {
    return this.db.db.select({
              passwordHash: owner.passwordHash
            })
            .from(owner)
            .where(eq(owner.id, id))
  }

  updatePasswordHash(id: number, newHash: string) {
    return this.db.db.update(owner)
            .set({
              passwordHash: newHash
            })
            .where(eq(owner.id, id))
  }

  async checkAndUpdatePassword(id: number, currentPassword: string, newPassword: string){
    const passwordHashById = await this.findById(id)
    if(!passwordHashById[0]) throw new NotFoundException('Не знайдено цього профілю')

    const verifyData = await verifyPassword(passwordHashById[0].passwordHash, currentPassword)
    if(!verifyData) throw new UnauthorizedException('Пароль некоректний, введіть заново')

    const newPasswordHash = await hashPassword(newPassword)

    await this.updatePasswordHash(id, newPasswordHash)

    return {
      message: "ok"
    }

  }

}
