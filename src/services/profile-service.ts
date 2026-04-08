import { profileApi } from '@/services/api/profile-api';

export const profileService = {
  getDisplayName: async (): Promise<string> => profileApi.getDisplayName(),
  saveDisplayName: async (value: string): Promise<void> => profileApi.saveDisplayName(value),
};
