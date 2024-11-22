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

  @Post()
  @ApiOperation({ summary: 'Place a bid on a service' })
  async createBid(
    @Body() body: { serviceId: string; userId: string; amount: number },
  ): Promise<Bid> {
    return this.bidsService.createBid(body.serviceId, body.userId, body.amount);
  }

  @Get('service/:serviceId')
  @ApiOperation({ summary: 'Get all bids for a service' })
  async getBidsByService(@Param('serviceId') serviceId: string): Promise<BidWithUser[]> {
    return this.bidsService.getBidsByService(serviceId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bids by a user' })
  async getBidsByUser(@Param('userId') userId: string): Promise<BidWithUser[]> {
    return this.bidsService.getBidsByUser(userId);
  }
}