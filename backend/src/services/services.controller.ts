import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { Service } from '../types';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  async createService(
    @Body()
    body: {
      userId: string;
      name: string;
      description: string;
      minimumBid: number;
      deadline: string;
    },
  ): Promise<Service> {
    return this.servicesService.createService(
      body.userId,
      body.name,
      body.description,
      body.minimumBid,
      body.deadline,
    );
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active services' })
  async getActiveServices(): Promise<Service[]> {
    return this.servicesService.getActiveServices();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all services by a user' })
  async getServicesByUser(@Param('userId') userId: string): Promise<Service[]> {
    return this.servicesService.getServicesByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  async getServiceById(@Param('id') id: string): Promise<Service> {
    return this.servicesService.getServiceById(id);
  }
}