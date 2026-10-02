import { z } from 'zod'
import { projectsType } from '../../../database/schema'

export const projectsZod = z.object({
    type: z.string()
            .optional()
            .transform(val => {
                if(typeof val === "string"){
                    return val.split(',')
                } else {
                    return undefined
                }
            })
            .pipe(
                z.array(
                    z.enum(projectsType.enumValues)
                )
            )
            .optional(),

    stack: z.string()
            .optional()
            .transform(val => {
                if(typeof val === "string"){
                    return val.split(',')
                } else {
                    return undefined
                }
            }),
            
    search: z.string()
            .max(40, { message: "Перевищено ліміт літер для пошуку"})
            .optional()
})