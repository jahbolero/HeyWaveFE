import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSupabaseClient } from '../config/supabase.config';
import { User } from '../types';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  private supabase = getSupabaseClient(this.configService);

  public async uploadProfileImage(
    file: Express.Multer.File,
    address: string,
  ): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${address}-${Date.now()}.${fileExt}`;

    const { data, error } = await this.supabase.storage
      .from('user-uploads')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    const cdnUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-uploads/${fileName}`;
    
    console.log('Generated CDN URL:', cdnUrl);
    return cdnUrl;
  }

  async updateUserProfile(
    address: string,
    username?: string,
    profileImage?: Express.Multer.File,
  ): Promise<User> {
    let imageUrl: string | undefined;

    if (profileImage) {
      imageUrl = await this.uploadProfileImage(profileImage, address);
    }

    return this.updateUser(address, username);
  }

  async createUser(address: string, username?: string, imageUrl?: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ address, username, image_url: imageUrl }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(address: string, username?: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .update({ username})
      .eq('address', address)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    console.log('Updated user:', data);
    return data;
  }

  async getUserByAddress(address: string): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .select()
      .eq('address', address)
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserImageUrl(address: string, imageUrl: string): Promise<User> {
    console.log('Attempting to update user image:', { address, imageUrl });
    
    const { data, error } = await this.supabase
      .from('users')
      .update({ image_url: imageUrl })
      .eq('address', address)
      .select()
      .single();

    if (error) {
      console.error('Update image error:', error);
      throw error;
    }

    console.log('Updated user with image:', data);
    return data;
  }
}