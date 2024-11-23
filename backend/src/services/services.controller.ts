import { Controller, Post, Get, Body, Param, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { Service, User } from '../types';

interface ServiceWithUser extends Service {
  users: User;
}

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('serviceImage'))
  async createService(
    @Body()
    body: {
      name: string;
      description: string;
      minimumBid: number;
      deadline: string;
      address: string;
    },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false, // Make the file optional
      }),
    )
    serviceImage?: Express.Multer.File,
  ): Promise<Service> {
    let serviceUrl = "serviceUrl"; // Default value
    
    if (serviceImage) {
      serviceUrl = await this.servicesService.uploadServiceImage(serviceImage, body.address);
    }

    return this.servicesService.createService(
      body.address,
      body.name,
      body.description,
      body.minimumBid,
      body.deadline,
      serviceUrl,
    );
  }

  @Get('active')
  @ApiOperation({ summary: 'Get all active services' })
  async getActiveServices(): Promise<ServiceWithUser[]> {
    const data = await this.servicesService.getActiveServices();
    return data;
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all services by a user' })
  async getServicesByUser(@Param('userId') userId: string): Promise<ServiceWithUser[]> {
    return this.servicesService.getServicesByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  async getServiceById(@Param('id') id: string): Promise<ServiceWithUser> {
    return this.servicesService.getServiceById(id);
  }
}