import { z } from 'zod'
import { projectsType } from '../../../database/schema'

export const patchProjectsDto = z.object({
    nameUa: z.string()
            .min(2, {
                message: 'Назва українською або відсутня, або дуже коротка'
            })
            .max(255, {
                message: 'Назва українською перевищує ліміт символів'
            })
    , nameEn: z.string()
            .min(2, {
                message: 'Назва англійською або відсутня, або дуже коротка'
            })
            .max(255, {
                message: 'Назва англійською перевищує ліміт символів'
            })
    , descUa: z.string()
            .min(2, {
                message: 'Опис українською або відсутня, або дуже короткий'
            })
            .max(255, {
                message: 'Опис українською перевищує ліміт символів'
            })
    , descEn: z.string()
            .min(2, {
                message: 'Опис англійською або відсутня, або дуже короткий'
            })
            .max(255, {
                message: 'Опис англійською перевищує ліміт символів'
            })
    , featuresUa: z.array(z.string().max(100))
            .min(1)
            .max(10)
    , featuresEn: z.array(z.string().max(100))
            .min(1)
            .max(10)
    , stack: z.array(z.string().max(100))
            .min(1)
            .max(25)
    , type: z.enum(projectsType.enumValues,{
                message: 'Заданий тип не відповідає дозволеним'
            })
    , live: z.httpUrl()
            .max(255)
            .optional()
            .nullable()
    , code: z.httpUrl()
            .max(255)
            .optional()
            .nullable()
    // , sortOrder: z.int()
    //         .min(1)
    //         .optional()
    //         .
}).partial().strict().refine(
    (val => (
        Object.keys(val).length >= 1
    )),{
    message: 'Потрібно вказати хоча б одне поле'
})