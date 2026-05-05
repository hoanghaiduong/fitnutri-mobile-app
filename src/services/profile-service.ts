import { profileApi } from '@/services/api/profile-api';

export const profileService = {
  getDisplayName: async (): Promise<string> => {
    try {
      const response = await profileApi.getProfile();
      return response.data?.fullName || response.data?.username || 'Kimano';
    } catch (e) {
      return 'Kimano';
    }
  },
  saveDisplayName: async (value: string): Promise<void> => {
    await profileApi.updateProfile({ fullName: value });
  },
};
