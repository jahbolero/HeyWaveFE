import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BidsService } from './bids.service';
import { Bid } from '../types';

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
  async getBidsByService(@Param('serviceId') serviceId: string): Promise<Bid[]> {
    return this.bidsService.getBidsByService(serviceId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bids by a user' })
  async getBidsByUser(@Param('userId') userId: string): Promise<Bid[]> {
    return this.bidsService.getBidsByUser(userId);
  }
}