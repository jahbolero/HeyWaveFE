import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { Bid, User } from '../types';

interface BidWithUser extends Bid {
  users: User;
}

@ApiTags('bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get('service/:serviceId')
  @ApiOperation({ summary: 'Get all bids for a service' })
  async getBidsByService(@Param('serviceId') serviceId: string): Promise<BidWithUser[]> {
    return this.bidsService.getBidsByService(serviceId);
  }
}