import { create } from 'zustand';

type NetworkState = {
  isOffline: boolean;
  setOffline: (offline: boolean) => void;
};

export const useNetworkStore = create<NetworkState>((set) => ({
  isOffline: false,
  setOffline: (offline: boolean) => set({ isOffline: offline }),
}));
