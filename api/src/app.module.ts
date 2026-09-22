import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [HealthModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
