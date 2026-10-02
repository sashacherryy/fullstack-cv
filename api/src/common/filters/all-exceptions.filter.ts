import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {

        const response: Response = host.switchToHttp().getResponse()

        if(exception instanceof HttpException){

            const status = exception.getStatus()
            const errorResponse = exception.getResponse()

            if (status >= 500) console.error(errorResponse)

            if(typeof errorResponse == 'string'){
                return response
                        .status(status)
                        .json({
                            status: "error"
                            , code: status
                            , message: errorResponse
                        })
            }

            if(typeof errorResponse == 'object' && 'message' in errorResponse){
                return response
                        .status(status)
                        .json({
                            status: "error"
                            , code: status
                            , message: errorResponse.message
                        })
            }

        } else {
            console.error(exception)
            return response
                    .status(500)
                    .json({
                        status: "error"
                        , code: 500
                        , message: "Server error, try again later"
                    })
        }
        
    }
}