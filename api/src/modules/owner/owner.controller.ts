import { Controller,  Patch } from '@nestjs/common';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Patch()
  update() {
    return 0
  }

}
