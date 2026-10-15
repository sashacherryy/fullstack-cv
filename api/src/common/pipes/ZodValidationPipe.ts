import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { z } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: z.ZodType<T>) {}
    transform(value: any, metadata: ArgumentMetadata){
        try{
            return this.schema.parse(value)
        } catch(err) {
            if(err instanceof z.ZodError) {
                let message = err.issues.map(val => {
                    return {
                        field: val.path.join('.'),
                        message: val.message,   
                    }
                })
                
                throw new BadRequestException({message})
            } else {
                console.error(err)
                throw new BadRequestException('Некоректний запит')
            }
        }
    }
}