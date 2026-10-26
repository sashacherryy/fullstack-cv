import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
 
@Module({
  imports: [
    OwnerModule
    , JwtModule.registerAsync({
      inject: [ConfigService]
      , global: true
      , useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')
        , signOptions : { 
            expiresIn: '15m' 
          } 
      })
    })
  ]
  , controllers: [AuthController]
  , providers: [AuthService]
  , exports: [ AuthService ]
})
export class AuthModule {}
