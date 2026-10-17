import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';
import { ProfileModule } from './profile/profile.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbModule } from '../database/db.module';
import { AuthModule } from './auth/auth.module';
import { OwnerModule } from './owner/owner.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ZodEnvSchema } from '../config/zod.env';


@Module({
  imports: [
    HealthModule
    , ProjectsModule

    , ConfigModule.forRoot({
      isGlobal: true
      , validationSchema: ZodEnvSchema
    })

    , ThrottlerModule.forRootAsync({
        inject: [ ConfigService ]
        , useFactory: (config: ConfigService) => [
          {
            ttl: config.get<number>('THROTTLER_TTL')!
            , limit: config.get<number>('THROTTLER_LIMIT')!
          }
        ]
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
