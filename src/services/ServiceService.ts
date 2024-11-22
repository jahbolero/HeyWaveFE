import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface Service {
  id: string;
  address: string;
  user_id: string;
  name: string;
  description: string;
  minimum_bid: number;
  deadline: string;
  highest_bidder_id?: string;
  highest_bid_amount?: number;
  created_at: string;
  service_url: string;
}

export interface CreateServiceDto {
  userId: string;
  address: string;
  name: string;
  description: string;
  minimumBid: string;
  deadline: string;
  serviceImage: File;
}

export class ServiceService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/services`;
  }

  async createService(serviceData: CreateServiceDto,imageFile: File): Promise<any> {
    try {
    console.log(serviceData);
    console.log(imageFile)
    
      const formData = new FormData();
      formData.append('address', serviceData.address);
      formData.append('name', serviceData.name);
      formData.append('description', serviceData.description);
      formData.append('minimumBid', serviceData.minimumBid);
      formData.append('deadline', serviceData.deadline);
      formData.append('serviceImage', imageFile);
      const response = await axios.post<Service>(this.baseUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  async getServiceById(id: string): Promise<Service> {
    try {
      const response = await axios.get<Service>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getActiveServices(): Promise<Service[]> {
    try {
      const response = await axios.get<Service[]>(`${this.baseUrl}/active`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getServicesByUser(userId: string): Promise<Service[]> {
    try {
      const response = await axios.get<Service[]>(`${this.baseUrl}/user/${userId}`);
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

export const serviceService = new ServiceService();
