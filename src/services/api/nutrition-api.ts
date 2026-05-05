import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';

export const nutritionApi = {
  getOptions: async (): Promise<ApiResponse<any>> => {
    return apiClient.request<any>({
      path: '/api/v3/nutrition/options',
      method: 'GET',
      requiresAuth: false,
    });
  },

  getProfile: async (): Promise<ApiResponse<any>> => {
    return apiClient.request<any>({
      path: '/api/v3/nutrition/profile',
      method: 'GET',
      requiresAuth: true,
    });
  },

  updateProfile: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.request<any>({
      path: '/api/v3/nutrition/profile',
      method: 'PUT',
      body: data,
      requiresAuth: true,
    });
  },

  generateRecommendation: async (payload: any): Promise<ApiResponse<any>> => {
    return apiClient.request<any>({
      path: '/api/v3/nutrition/recommendation',
      method: 'POST',
      body: payload,
      requiresAuth: true,
    });
  },

  generateRecommendationAgent: async (payload: any): Promise<ApiResponse<any>> => {
    return apiClient.request<any>({
      path: '/api/v3/nutrition/recommendation-agent',
      method: 'POST',
      body: payload,
      requiresAuth: true,
    });
  },
};
