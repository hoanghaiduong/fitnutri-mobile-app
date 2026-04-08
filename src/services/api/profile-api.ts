import { apiClient } from '@/lib/api-client';
import { storage } from '@/lib/storage';

const PROFILE_KEY = 'profile.display-name';

export const profileApi = {
  getDisplayName: async (): Promise<string> => {
    await apiClient.request({ path: '/profile', requiresAuth: false });
    return (await storage.getItem<string>(PROFILE_KEY)) ?? 'Kimano';
  },
  saveDisplayName: async (value: string): Promise<void> => {
    await apiClient.request({ path: '/profile', method: 'PATCH', body: { displayName: value }, requiresAuth: false });
    await storage.setItem(PROFILE_KEY, value);
  },
};
