import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSupabaseClient } from '../config/supabase.config';
import { Service } from '../types';

@Injectable()
export class ServicesService {
  constructor(private configService: ConfigService) {}

  private supabase = getSupabaseClient(this.configService);

  async createService(
    userId: string,
    name: string,
    description: string,
    minimumBid: number,
    deadline: string,
  ): Promise<Service> {
    const { data, error } = await this.supabase
      .from('services')
      .insert([
        {
          user_id: userId,
          name,
          description,
          minimum_bid: minimumBid,
          deadline,
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

  async getServiceById(id: string): Promise<Service> {
    const { data, error } = await this.supabase
      .from('services')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getServicesByUser(userId: string): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from('services')
      .select()
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }

  async getActiveServices(): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from('services')
      .select()
      .gt('deadline', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}