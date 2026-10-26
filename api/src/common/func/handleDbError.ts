import { ConflictException } from "@nestjs/common";
import { DrizzleQueryError } from "drizzle-orm/errors";

export default function handleDbError(e: any): never{
    const uniqueMessage: Record<string, string> = {
            projects_live_unique: 'Проєкт з таким посиланням вже існує'
            , projects_code_unique: 'Проєкт з таким посиланням на код вже існує'
    }

    if(e instanceof DrizzleQueryError){
        const pgError = e.cause as {code?: string, constraint?: string} | undefined

        if(pgError?.code === '23505'){
            throw new ConflictException(uniqueMessage[pgError.constraint ?? ''] ?? 'Такий запис вже існує')
        }
    }
    throw e 
}