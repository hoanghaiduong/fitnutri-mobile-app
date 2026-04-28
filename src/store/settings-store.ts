import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SettingsState = {
  biometricsEnabled: boolean;
  setBiometrics: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      biometricsEnabled: false,
      setBiometrics: (enabled) => set({ biometricsEnabled: enabled }),
    }),
    {
      name: 'fitnutri-settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
