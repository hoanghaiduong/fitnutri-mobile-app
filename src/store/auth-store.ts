import { create } from 'zustand';

import { authService } from '@/services/auth-service';
import type { AuthProvider, AuthSession } from '@/types/auth';

type AuthState = AuthSession & {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  login: (payload: { email?: string; phone?: string; password?: string; name?: string; provider?: AuthProvider }) => Promise<void>;
  refreshSession: () => Promise<void>;
  completeProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  hydrated: false,
  isAuthenticated: false,
  user: null,
  tokens: null,
  hydrate: async () => {
    try {
      const session = await authService.getSession();
      set({ ...session, hydrated: true });
    } catch {
      set({ isAuthenticated: false, user: null, tokens: null, hydrated: true });
    }
  },
  login: async (payload) => {
    const session = await authService.login(payload);
    set(session);
  },
  refreshSession: async () => {
    const session = await authService.refreshSession();
    if (session) {
      set(session);
    }
  },
  completeProfile: async () => {
    const session = await authService.completeProfile();
    set(session);
  },
  logout: async () => {
    await authService.logout();
    set({ isAuthenticated: false, user: null, tokens: null });
  },
}));
