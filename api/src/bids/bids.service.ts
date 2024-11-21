import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSupabaseClient } from '../config/supabase.config';
import { ServicesService } from '../services/services.service';
import { Bid } from '../types';

@Injectable()
export class BidsService {
  constructor(
    private configService: ConfigService,
    private servicesService: ServicesService,
  ) {}

  private supabase = getSupabaseClient(this.configService);

  async createBid(serviceId: string, userId: string, amount: number): Promise<Bid> {
    const { data: bid, error: bidError } = await this.supabase
      .from('bids')
      .insert([{ service_id: serviceId, user_id: userId, amount }])
      .select()
      .single();

    if (bidError) throw bidError;

    // Update service with highest bid if applicable
    await this.servicesService.updateHighestBid(serviceId, userId, amount);

    return bid;
  }

  async getBidsByService(serviceId: string): Promise<Bid[]> {
    const { data, error } = await this.supabase
      .from('bids')
      .select()
      .eq('service_id', serviceId)
      .order('amount', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getBidsByUser(userId: string): Promise<Bid[]> {
    const { data, error } = await this.supabase
      .from('bids')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}