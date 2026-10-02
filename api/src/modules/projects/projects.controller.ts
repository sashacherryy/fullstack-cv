import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ZodValidationPipe } from '../../common/pipes/ZodValidationPipe';
import { projectsZod } from './dto/projects-query.schema';
import { z } from 'zod'

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findMany(@Query(new ZodValidationPipe(projectsZod)) query: z.infer<typeof projectsZod>){
    return this.projectsService.findMany(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.projectsService.findOne(id)
  }

}
