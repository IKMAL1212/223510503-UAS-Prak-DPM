// api.ts
// @ts-ignore
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from '../utils/auth';

// Define the User type within api.ts
export interface User {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

const API_URL = 'https://backendbooktrack-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post<{ token: string }>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    const apiError = error as any;
    throw apiError.response?.data || { message: 'Network error' };
  }
};

export const register = async (username: string, password: string, email: string) => {
  try {
    const response = await api.post<{ message: string }>('/auth/register', { username, password, email });
    return response.data;
  } catch (error) {
    const apiError = error as any;
    throw apiError.response?.data || { message: 'Network error' };
  }
};

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get<{ data: User }>('/profile');
    return response.data.data;
  } catch (error) {
    const apiError = error as any;
    throw apiError.response?.data || { message: 'Network error' };
  }
};

export const updateUserProfile = async (user: { username: string; email: string }): Promise<User> => {
  try {
    const response = await api.put<{ data: User }>('/profile', user);
    return response.data.data;
  } catch (error) {
    const apiError = error as any;
    throw apiError.response?.data || { message: 'Network error' };
  }
};
