import { UnauthorizedException, Injectable } from '@nestjs/common';
import { loginDto } from './dto/login-dto.schema'
import { OwnerService } from '../owner/owner.service'
import verifyPassword from '../../common/func/verifyPassword';
import { z } from 'zod'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly ownerService: OwnerService,  private readonly jwtService: JwtService){}

  async login(dto: z.infer<typeof loginDto>) {
    const { email, password } = dto
    let owner = await this.ownerService.findByEmail(email.trim())

    if(owner.length === 0) throw new UnauthorizedException("Неправильний логін або пароль")

    if (await verifyPassword(owner[0].passwordHash, password)){
      return {
        "accessToken": this.jwtService.sign({ sub: owner[0].id })
      }
    } else {
      throw new UnauthorizedException("Неправильний логін або пароль")
    }
  }

}
