import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';
import { ProfileModule } from './profile/profile.module'
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../database/db.module';
import { AuthModule } from './auth/auth.module';
import { OwnerModule } from './owner/owner.module';
import { ThrottlerModule } from '@nestjs/throttler';

let THROTTLER_LIMIT: number = Number(process.env.THROTTLER_LIMIT)
let THROTTLER_TTL: number  = Number(process.env.THROTTLER_TTL)

if(
  !THROTTLER_LIMIT && THROTTLER_LIMIT <= 0
  || !THROTTLER_TTL && THROTTLER_TTL <= 0
) throw new Error('Не заповненні THROTTLER_LIMIT або THROTTLER_TTL в змінних середовища або вони не є додатнім числом')


@Module({
  imports: [
    HealthModule
    , ProjectsModule
    , ConfigModule.forRoot({
      isGlobal: true,
    })
    , ThrottlerModule.forRoot({
        throttlers: [{
          limit: THROTTLER_LIMIT,
          ttl: THROTTLER_TTL
        }
      ]
      , errorMessage: "Перевищено ліміт запитів"
    })
    , DbModule
    , ProfileModule
    , AuthModule
    , OwnerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
