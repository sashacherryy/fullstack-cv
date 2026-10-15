import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class OwnerGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext):boolean{

        const request = context.switchToHttp().getRequest()
        const header = request.headers['authorization'];

        if(!header || !header.startsWith('Bearer ')) throw new UnauthorizedException('Не авторизовано')

        const token = header.split(" ")[1]

        try {
            const payload = this.jwtService.verify(token)
            request.ownerId = payload.sub
            return true
        } catch (error) {
            console.error('Error while validation token' + error)
            throw new UnauthorizedException('Не авторизовано')
        }
    }
}