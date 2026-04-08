import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import { defaultProfileSetupDraft } from '@/features/profile-setup/constants';
import type { ProfileSetupDraft } from '@/types/profile';

export const profileSetupService = {
  getDraft: async (): Promise<ProfileSetupDraft> => {
    return (await storage.getItem<ProfileSetupDraft>(STORAGE_KEYS.profileSetupDraft)) ?? defaultProfileSetupDraft;
  },
  saveDraft: async (draft: ProfileSetupDraft): Promise<void> => {
    await storage.setItem(STORAGE_KEYS.profileSetupDraft, draft);
  },
  clearDraft: async (): Promise<void> => {
    await storage.removeItem(STORAGE_KEYS.profileSetupDraft);
  },
};
