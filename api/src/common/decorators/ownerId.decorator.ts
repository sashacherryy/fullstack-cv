import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { Request } from  'express'

export const OwnerId = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<Request>()
        if(request.ownerId) return request.ownerId
        else throw new BadRequestException('Відсутній профіль')
    } 
)