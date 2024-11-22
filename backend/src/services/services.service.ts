import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSupabaseClient } from '../config/supabase.config';
import { Service, User } from '../types';

interface ServiceWithUser extends Service {
  users: User;
}

@Injectable()
export class ServicesService {
  constructor(private configService: ConfigService) {}

  private supabase = getSupabaseClient(this.configService);

  async uploadServiceImage(
    file: Express.Multer.File,
    userId: string,
  ): Promise<string> {
    if (!file) throw new BadRequestException('No file provided');

    const fileExt = file.originalname.split('.').pop();
    const fileName = `service-${userId}-${Date.now()}.${fileExt}`;

    const { data, error } = await this.supabase.storage
      .from('service-uploads')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    const cdnUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/service-uploads/${fileName}`;
    
    console.log('Generated Service Image CDN URL:', cdnUrl);
    return cdnUrl;
  }

  async createService(
    address: string,
    name: string,
    description: string,
    minimumBid: number,
    deadline: string,
    serviceUrl: string,
  ): Promise<Service> {
    const { data, error } = await this.supabase
      .from('services')
      .insert([
        {
          name,
          description,
          minimum_bid: minimumBid,
          deadline,
          service_url: serviceUrl,
          address:address
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateHighestBid(
    serviceId: string,
    bidderId: string,
    amount: number,
  ): Promise<void> {
    const { data: service } = await this.supabase
      .from('services')
      .select('highest_bid_amount')
      .eq('id', serviceId)
      .single();

    if (!service?.highest_bid_amount || amount > service.highest_bid_amount) {
      const { error } = await this.supabase
        .from('services')
        .update({
          highest_bidder_id: bidderId,
          highest_bid_amount: amount,
        })
        .eq('id', serviceId);

      if (error) throw error;
    }
  }

  async getServiceById(id: string): Promise<ServiceWithUser> {
    const { data: service, error: serviceError } = await this.supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (serviceError) throw serviceError;

    const { data: user, error: userError } = await this.supabase
      .from('users')
      .select('*')
      .eq('address', service.address)
      .single();

    if (userError) throw userError;

    return { ...service, users: user };
  }

  async getServicesByUser(userId: string): Promise<ServiceWithUser[]> {
    const { data: services, error: servicesError } = await this.supabase
      .from('services')
      .select('*')
      .eq('address', userId);

    if (servicesError) throw servicesError;

    const { data: user, error: userError } = await this.supabase
      .from('users')
      .select('*')
      .eq('address', userId)
      .single();

    if (userError) throw userError;

    return services.map(service => ({ ...service, users: user }));
  }

  async getActiveServices(): Promise<ServiceWithUser[]> {
    const { data: services, error: servicesError } = await this.supabase
      .from('services')
      .select('*')
      .gt('deadline', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (servicesError) throw servicesError;

    // Get unique addresses from services
    const addresses = [...new Set(services.map(service => service.address))];

    // Fetch all users in one query
    const { data: users, error: usersError } = await this.supabase
      .from('users')
      .select('*')
      .in('address', addresses);

    if (usersError) throw usersError;

    // Create a map of address to user for quick lookup
    const userMap = new Map(users.map(user => [user.address, user]));

    // Combine services with their users
    return services.map(service => ({
      ...service,
      users: userMap.get(service.address)!
    }));
  }
}