import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';

export type UserPreferences = {
  language?: string;
  theme?: string;
  pushNotifications?: boolean;
  emailNotifications?: boolean;
  marketingEmails?: boolean;
  biometricUnlockEnabled?: boolean;
};

export const settingsApi = {
  getPreferences: async (): Promise<ApiResponse<UserPreferences>> => {
    return apiClient.request<UserPreferences>({
      path: '/api/v3/users/me/preferences',
      method: 'GET',
      requiresAuth: true,
    });
  },

  updatePreferences: async (preferences: UserPreferences): Promise<ApiResponse<UserPreferences>> => {
    return apiClient.request<UserPreferences>({
      path: '/api/v3/users/me/preferences',
      method: 'PUT',
      body: preferences,
      requiresAuth: true,
    });
  },
};
