import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login-dto.schema'
import { z } from 'zod'
import { ZodValidationPipe } from '../../common/pipes/ZodValidationPipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new ZodValidationPipe(loginDto)) dto: z.infer<typeof loginDto>) {
    return this.authService.login(dto)
  }

}
