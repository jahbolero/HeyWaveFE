export interface User {
  id: string;
  address: string;
  username?: string;
  image_url?: string;
  created_at: string;
}

export interface Service {
  id: string;
  user_id: string;
  name: string;
  description: string;
  minimum_bid: number;
  deadline: string;
  highest_bidder_id?: string;
  highest_bid_amount?: number;
  created_at: string;
}

export interface Bid {
  id: string;
  service_id: string;
  user_id: string;
  amount: number;
  created_at: string;
}