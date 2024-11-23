import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSupabaseClient } from '../config/supabase.config';
import { ServicesService } from '../services/services.service';
import { Bid,User } from '../types';
interface BidWithUser extends Bid {
  users: User;
}

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


  async getBidsByUser(userId: string): Promise<Bid[]> {
    const { data, error } = await this.supabase
      .from('bids')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
    
  }

  async getBidsByService(serviceId: string): Promise<BidWithUser[]> {
    const { data: bids, error: bidsError } = await this.supabase
      .from('bids')
      .select()
      .eq('service_id', serviceId)
      .order('amount', { ascending: false });

    if (bidsError) throw bidsError;

    // Get unique addresses from bids
    const addresses = [...new Set(bids.map(bid => bid.user_id))];

    // Fetch all users in one query
    const { data: users, error: usersError } = await this.supabase
      .from('users')
      .select('*')
      .in('address', addresses);

    if (usersError) throw usersError;

    // Create a map of address to user for quick lookup
    const userMap = new Map(users.map(user => [user.address, user]));

    // Combine bids with their users
    return bids.map(bid => ({
      ...bid,
      users: userMap.get(bid.user_id)!
    }));
  }
}