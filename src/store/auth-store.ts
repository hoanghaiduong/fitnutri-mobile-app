import { create } from 'zustand';

import { authService } from '@/services/auth-service';
import type { AuthProvider, AuthSession } from '@/types/auth';

type AuthState = AuthSession & {
  hydrated: boolean;
  hydrating: boolean;
  hydrate: () => Promise<void>;
  login: (payload: { email?: string; phone?: string; password?: string; name?: string; provider?: AuthProvider }) => Promise<AuthSession>;
  refreshSession: () => Promise<void>;
  completeProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

let hydrationPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  hydrated: false,
  hydrating: false,
  isAuthenticated: false,
  user: null,
  tokens: null,
  hydrate: async () => {
    if (get().hydrated) {
      return;
    }

    if (hydrationPromise) {
      return hydrationPromise;
    }

    set({ hydrating: true });

    hydrationPromise = (async () => {
      try {
        const session = await authService.getSession();
        set({ ...session, hydrated: true });
      } catch {
        set({ isAuthenticated: false, user: null, tokens: null, hydrated: true });
      } finally {
        hydrationPromise = null;
        set({ hydrating: false });
      }
    })();

    return hydrationPromise;
  },
  login: async (payload) => {
    const session = await authService.login(payload);
    set({ ...session, hydrated: true, hydrating: false });
    return session;
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
    set({ isAuthenticated: false, user: null, tokens: null, hydrated: true, hydrating: false });
  },
}));
