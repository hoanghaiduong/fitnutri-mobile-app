import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import { authApi } from '@/services/auth-api';
import { tokenService } from '@/services/token-service';
import { biometricService } from '@/services/biometric-service';
import type { AuthProvider, AuthSession } from '@/types/auth';

type LoginPayload = {
  email?: string;
  phone?: string;
  password?: string;
  name?: string;
  provider?: AuthProvider;
};

type GetSessionOptions = {
  requireBiometricUnlock?: boolean;
};

const defaultSession: AuthSession = {
  isAuthenticated: false,
  user: null,
  tokens: null,
};

let biometricUnlockGranted = false;

const unlockWithBiometricsIfNeeded = async (required: boolean): Promise<boolean> => {
  if (!required || biometricUnlockGranted) {
    return true;
  }

  const isBiometricEnabled = await tokenService.isBiometricEnabled();
  if (!isBiometricEnabled) {
    return true;
  }

  const authenticated = await biometricService.authenticate('Xác thực để mở khóa FitNutri');
  biometricUnlockGranted = authenticated;
  return authenticated;
};

export const authService = {
  getSession: async (options: GetSessionOptions = {}): Promise<AuthSession> => {
    const requireBiometricUnlock = options.requireBiometricUnlock ?? true;
    const session = (await storage.getItem<AuthSession>(STORAGE_KEYS.authSession)) ?? defaultSession;
    if (!session.isAuthenticated) {
      return defaultSession;
    }

    const tokens = await tokenService.getTokens();
    if (!tokens) {
      return defaultSession;
    }

    const unlocked = await unlockWithBiometricsIfNeeded(requireBiometricUnlock);
    if (!unlocked) {
      return defaultSession;
    }

    if (tokens && tokenService.isExpired(tokens)) {
      const refreshed = await authService.refreshSession();
      return refreshed ?? defaultSession;
    }

    return { ...session, tokens };
  },
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    const response = await authApi.login(payload);
    await storage.setItem(STORAGE_KEYS.authSession, response.data);
    if (response.data.tokens) {
      await tokenService.saveTokens(response.data.tokens);
    }
    biometricUnlockGranted = true;
    return response.data;
  },
  refreshSession: async (): Promise<AuthSession | null> => {
    const session = (await storage.getItem<AuthSession>(STORAGE_KEYS.authSession)) ?? null;
    const tokens = await tokenService.getTokens();
    const refreshToken = tokens?.refreshToken;

    if (!session || !refreshToken) {
      return null;
    }

    try {
      const refreshedTokens = await authApi.refreshToken(refreshToken);
      const nextSession: AuthSession = {
        ...session,
        tokens: refreshedTokens.data,
      };

      await storage.setItem(STORAGE_KEYS.authSession, nextSession);
      await tokenService.saveTokens(refreshedTokens.data);
      return nextSession;
    } catch {
       return null;
    }
  },
  completeProfile: async (): Promise<AuthSession> => {
    const current = await authService.getSession({ requireBiometricUnlock: false });
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
    await authApi.logout();
    await tokenService.clearTokens();
    await storage.removeItem(STORAGE_KEYS.authSession);
    biometricUnlockGranted = false;
  },
};
