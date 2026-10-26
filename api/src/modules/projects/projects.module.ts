import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DbModule } from '../../database/db.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DbModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
