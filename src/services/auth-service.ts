import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import { authApi } from '@/services/auth-api';
import { tokenService } from '@/services/token-service';
import type { AuthProvider, AuthSession } from '@/types/auth';

type LoginPayload = {
  email?: string;
  phone?: string;
  password?: string;
  name?: string;
  provider?: AuthProvider;
};

const defaultSession: AuthSession = {
  isAuthenticated: false,
  user: null,
  tokens: null,
};

export const authService = {
  getSession: async (): Promise<AuthSession> => {
    const session = (await storage.getItem<AuthSession>(STORAGE_KEYS.authSession)) ?? defaultSession;

    if (session.tokens && tokenService.isExpired(session.tokens)) {
      const refreshed = await authService.refreshSession();
      return refreshed ?? defaultSession;
    }

    return session;
  },
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    const response = await authApi.login(payload);
    await storage.setItem(STORAGE_KEYS.authSession, response.data);
    if (response.data.tokens) {
      await tokenService.saveTokens(response.data.tokens);
    }
    return response.data;
  },
  refreshSession: async (): Promise<AuthSession | null> => {
    const session = (await storage.getItem<AuthSession>(STORAGE_KEYS.authSession)) ?? null;
    const refreshToken = session?.tokens?.refreshToken;

    if (!session || !refreshToken) {
      return null;
    }

    const refreshedTokens = await authApi.refreshToken(refreshToken);
    const nextSession: AuthSession = {
      ...session,
      tokens: refreshedTokens.data,
    };

    await storage.setItem(STORAGE_KEYS.authSession, nextSession);
    await tokenService.saveTokens(refreshedTokens.data);
    return nextSession;
  },
  completeProfile: async (): Promise<AuthSession> => {
    const current = await authService.getSession();
    const next: AuthSession = {
      isAuthenticated: true,
      user: current.user
        ? { ...current.user, isProfileCompleted: true }
        : { email: 'guest@fitnutri.app', isProfileCompleted: true },
      tokens: current.tokens ?? null,
    };
    await storage.setItem(STORAGE_KEYS.authSession, next);
    return next;
  },
  logout: async (): Promise<void> => {
    await tokenService.clearTokens();
    await storage.removeItem(STORAGE_KEYS.authSession);
  },
};
