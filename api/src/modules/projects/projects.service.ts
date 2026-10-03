import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../../database/db.service';
import { projects } from '../../database/schema';
import { arrayOverlaps, asc, or, and, ilike, inArray, eq } from 'drizzle-orm';
import { projectsZod } from './dto/projects-query.schema'
import { z } from 'zod'

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
        .orderBy(asc(this.columns.sortOrder))

  }

  async findOne(id: number){
    let result = await this.db.db
        .select(this.columns)
        .from(projects)
        .where(eq(projects.id, id))
      
    if(result.length === 0) throw new NotFoundException(`Проект з id ${id} не знайдено`)

    return result[0]
  }

}
