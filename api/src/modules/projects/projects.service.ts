import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../../database/db.service';
import { projects } from '../../database/schema';
import { arrayOverlaps, asc, or, and, ilike, inArray, eq, sql } from 'drizzle-orm';
import { projectsZod } from './dto/projects-query.schema'
import { z } from 'zod'
import { createProjectsDto } from './dto/createProjects.schema';
import { patchProjectsDto } from './dto/patchProjects.schema';
import handleDbError from '../../common/func/handleDbError';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: DbService){}

   columns = {
          id: projects.id
          , nameUa: projects.nameUa
          , nameEn: projects.nameEn
          , descUa: projects.descUa
          , descEn: projects.descEn
          , featuresUa: projects.featuresUa
          , featuresEn: projects.featuresEn
          , stack: projects.stack
          , type: projects.type
          , live: projects.live
          , code: projects.code
          , sortOrder: projects.sortOrder
   }

  findMany(query: z.infer<typeof projectsZod>){
    let conditions: any[] = []
    
    if(query.type !== undefined) conditions.push(inArray(projects.type, query.type))

    if(query.stack !== undefined) conditions.push(arrayOverlaps(projects.stack, query.stack))

    if(query.search !== undefined) conditions.push(or(
                                                      ilike(projects.nameUa, `%${query.search}%`)
                                                      , ilike(projects.nameEn, `%${query.search}%`)
                                                    ))

    return this.db.db
        .select(this.columns)
        .from(projects)
        .where(and(...conditions))
        .orderBy(asc(this.columns.sortOrder)
                , asc(this.columns.id))
  }

  async patchProject(id: number, project: z.infer<typeof patchProjectsDto>){
    try{

      const resultPatch = await this.db.db
            .update(projects)
            .set(project)
            .where(eq(projects.id, id))
            .returning(this.columns)

      if(resultPatch.length < 1) throw new NotFoundException('Дані не змінились')

      return resultPatch[0]

    } catch (e) {
      handleDbError(e)
    } 
  }

  async findOne(id: number){
    let result = await this.db.db
        .select(this.columns)
        .from(projects)
        .where(eq(projects.id, id))
      
    if(result.length === 0) throw new NotFoundException(`Проект з id ${id} не знайдено`)

    return result[0]
  }

  async createProject(project: z.infer<typeof createProjectsDto>) {

    const [maxSortOrder] = await this.db.db.select({
          maxSort: sql`COALESCE(MAX(${projects.sortOrder}), 0)`
        })
        .from(projects)

    // SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM projects;

    const nextSortOrder = Number(maxSortOrder.maxSort) + 1;
    
    try {
        const [newProject] = await this.db.db
              .insert(projects)
              .values({
                ...project, 
                sortOrder: nextSortOrder
              })
              .returning(this.columns)

        return newProject
    } catch (e) {
      handleDbError(e)
    }

  }

  async deleteProject(id: number){
    try {
      const resultDelete = await this.db.db
            .delete(projects)
            .where(eq(projects.id, id))
            .returning({id: projects.id})

      if(resultDelete.length < 1) throw new NotFoundException('Не знайдено такого проекту')

      return {
        message: 'ok'
      }

    } catch(e) {
      handleDbError(e)
    }
  }

}
