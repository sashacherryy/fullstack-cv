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

@Module({
  imports: [
    HealthModule
    , ProjectsModule
    , ConfigModule.forRoot({
      isGlobal: true,
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
