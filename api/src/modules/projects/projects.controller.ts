import { Controller, Get, Param, Post, Body, ParseIntPipe, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ZodValidationPipe } from '../../common/pipes/ZodValidationPipe';
import { projectsZod } from './dto/projects-query.schema';
import { z } from 'zod'
import { createProjectsDto } from './dto/createProjects.schema';
import { patchProjectsDto } from './dto/patchProjects.schema';
import { OwnerGuard } from '../../common/guards/owner.guards';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findMany(@Query(new ZodValidationPipe(projectsZod)) query: z.infer<typeof projectsZod>){
    return this.projectsService.findMany(query);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.projectsService.findOne(id)
  }
  
  @Post()
  @UseGuards(OwnerGuard)
  createProject(@Body(new ZodValidationPipe(createProjectsDto)) dto: z.infer<typeof createProjectsDto>){
    return this.projectsService.createProject(dto)
  }

  @Patch(':id')
  @UseGuards(OwnerGuard)
  patchProject(@Param('id', ParseIntPipe) id: number, @Body(new ZodValidationPipe(patchProjectsDto)) project: z.infer<typeof patchProjectsDto>){
    return this.projectsService.patchProject(id, project)
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  deleteProject(@Param('id', ParseIntPipe) id: number){
    return this.projectsService.deleteProject(id)
  }
  

}
