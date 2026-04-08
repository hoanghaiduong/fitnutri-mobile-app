import { create } from 'zustand';

import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import type { ThemeMode } from '@/types/theme';

type ThemeState = {
  mode: ThemeMode;
  hydrated: boolean;
  setMode: (mode: ThemeMode) => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  hydrated: false,
  setMode: async (mode) => {
    set({ mode });
    await storage.setItem(STORAGE_KEYS.themeMode, mode);
  },
  hydrate: async () => {
    try {
      const savedMode = await storage.getItem<ThemeMode>(STORAGE_KEYS.themeMode);
      set({ mode: savedMode ?? 'light', hydrated: true });
    } catch {
      set({ mode: 'light', hydrated: true });
    }
  },
}));
