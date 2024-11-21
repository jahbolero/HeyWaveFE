import { Controller, Post, Put, Body, Param, Get, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../types';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async createUser(
    @Body() body: { address: string; username?: string; imageUrl?: string },
  ): Promise<User> {
    return this.usersService.createUser(body.address, body.username, body.imageUrl);
  }

  @Put(':address')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('username'))  // Add this even though we're not handling files
  async updateUser(
    @Param('address') address: string,
    @Body() body: { username: string },
  ): Promise<User> {
    console.log('Received update request:', { address, body });
    return this.usersService.updateUser(address, body.username);
  }

  @Put(':address/profile-image')
  @ApiOperation({ summary: 'Update user profile image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage'))
  async updateProfileImage(
    @Param('address') address: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    profileImage: Express.Multer.File,
  ): Promise<User> {
    const imageUrl = await this.usersService.uploadProfileImage(profileImage, address);
    return this.usersService.updateUserImageUrl(address, imageUrl);
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get user by address' })
  async getUserByAddress(@Param('address') address: string): Promise<User> {
    return this.usersService.getUserByAddress(address);
  }
}