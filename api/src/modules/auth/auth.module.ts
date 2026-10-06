import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    OwnerModule
    , JwtModule.register({ 
        secret: process.env.JWT_SECRET
        , signOptions:
          { 
            expiresIn: '15m' 
          } 
        })
  ]
  , controllers: [AuthController]
  , providers: [AuthService]
  , exports: [AuthService]
})
export class AuthModule {}
