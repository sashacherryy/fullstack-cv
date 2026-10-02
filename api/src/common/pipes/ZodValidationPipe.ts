import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodType } from 'zod'

export class ZodValidationPipe<T> implements PipeTransform {
    constructor(private readonly schema: ZodType<T>) {}
    transform(value: any, metadata: ArgumentMetadata){
        try{
            return this.schema.parse(value)
        } catch(err) {
            console.error(err)
            throw new BadRequestException("Некоректний запит")
        }
    }
}