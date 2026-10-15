import { Body, Controller, Patch,UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerGuard } from '../../common/guards/owner.guards';
import { changePasswordDto } from './dto/changePasswordDto'
import { ZodValidationPipe } from '../../common/pipes/ZodValidationPipe';
import { OwnerId } from '../../common/decorators/ownerId.decorator'
import { z } from 'zod'
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Patch()
  @UseGuards(OwnerGuard, ThrottlerGuard)
  async update(
    @OwnerId() ownerId: number,
    @Body(new ZodValidationPipe(changePasswordDto)) dto: z.infer<typeof changePasswordDto>) {
    return await this.ownerService.checkAndUpdatePassword(ownerId , dto.currentPassword , dto.newPassword)
  }



}
