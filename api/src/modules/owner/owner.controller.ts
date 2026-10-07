import { Controller,  Patch, Req, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerGuard } from '../../common/guards/owner.guards';
import type { Request } from 'express' 

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Patch()
  @UseGuards(OwnerGuard)
  update(@Req() request: Request) {
    return { 
      ownerId: request.ownerId
    }
  }

}
