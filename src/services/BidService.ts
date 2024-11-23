import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface Bid {
  id: string;
  service_id: string;
  user_id: string;
  amount: number;
  created_at: string;
  active: boolean;
}

export class BidService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/bids`;
  }

  async createBid(serviceId: string, userId: string, amount: number): Promise<Bid> {
    try {
      const response = await axios.post<Bid>(this.baseUrl, {
        serviceId,
        userId,
        amount
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBidsByService(serviceId: string): Promise<Bid[]> {
    try {
      console.warn("HERE IT IS");
      const response = await axios.get<Bid[]>(`${this.baseUrl}/service/${serviceId}`);
      console.warn(response.data)
      return response.data;

    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBidsByUser(userId: string): Promise<Bid[]> {
    try {
      const response = await axios.get<Bid[]>(`${this.baseUrl}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(`API Error: ${message}`);
    }
    return error;
  }
}

export const bidService = new BidService();
