import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface User {
  id: string;
  address: string;
  username?: string;
  image_url?: string;
  created_at: string;
}

export interface CreateUserDto {
  address: string;
  username?: string;
  image?: File;
}

export interface UpdateUserDto {
  username?: string;
  image?: File;
}

class UserService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/users`;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('address', userData.address);
      if (userData.username) formData.append('username', userData.username);
      if (userData.image) formData.append('image', userData.image);

      const response = await axios.post<User>(this.baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    try {
      const formData = new FormData();
      if (userData.username) formData.append('username', userData.username);
      if (userData.image) formData.append('image', userData.image);

      const response = await axios.put<User>(`${this.baseUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await axios.get<User>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProfileImage(address: string, imageFile: File): Promise<User> {
    try {
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await axios.put<User>(
        `${this.baseUrl}/${address}/profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
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

export const userService = new UserService();