import { create } from 'zustand';

import { defaultProfileSetupDraft } from '@/features/profile-setup/constants';
import { profileSetupService } from '@/services/profile-setup-service';
import type { ProfileSetupDraft } from '@/types/profile';

type ProfileSetupState = {
  draft: ProfileSetupDraft;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  patchDraft: (patch: Partial<ProfileSetupDraft>) => Promise<void>;
  resetDraft: () => Promise<void>;
};

export const useProfileSetupStore = create<ProfileSetupState>((set, get) => ({
  draft: defaultProfileSetupDraft,
  hydrated: false,
  hydrate: async () => {
    const draft = await profileSetupService.getDraft();
    set({ draft, hydrated: true });
  },
  patchDraft: async (patch) => {
    const nextDraft = { ...get().draft, ...patch };
    set({ draft: nextDraft });
    await profileSetupService.saveDraft(nextDraft);
  },
  resetDraft: async () => {
    set({ draft: defaultProfileSetupDraft });
    await profileSetupService.clearDraft();
  },
}));
