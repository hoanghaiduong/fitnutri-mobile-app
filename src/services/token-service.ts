import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import type { TokenPair } from '@/types/auth';
import { biometricService } from '@/services/biometric-service';

export const BIOMETRIC_ENABLED_KEY = 'settings.biometric_enabled';

export const tokenService = {
  isBiometricEnabled: async (): Promise<boolean> => {
    return (await storage.getItem<boolean>(BIOMETRIC_ENABLED_KEY)) ?? false;
  },
  
  setBiometricEnabled: async (enabled: boolean): Promise<void> => {
    await storage.setItem(BIOMETRIC_ENABLED_KEY, enabled);
  },

  getTokens: async (): Promise<TokenPair | null> => {
    const session = await storage.getItem<{ tokens?: Partial<TokenPair> | null }>(STORAGE_KEYS.authSession);
    if (!session?.tokens) return null;

    const tokens = { ...session.tokens } as TokenPair;
    
    // If biometric is enabled, refreshToken might be in SecureStore
    const isBio = await tokenService.isBiometricEnabled();
    if (isBio) {
      const secureToken = await biometricService.getSecureItem(STORAGE_KEYS.refreshToken);
      if (secureToken) {
        tokens.refreshToken = secureToken;
      }
    } else {
      const normalRefresh = await storage.getItem<string>(STORAGE_KEYS.refreshToken);
      if (normalRefresh) {
         tokens.refreshToken = normalRefresh;
      }
    }
    
    return tokens;
  },

  saveTokens: async (tokens: TokenPair): Promise<void> => {
    const session = await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession) || {};
    
    const isBio = await tokenService.isBiometricEnabled();
    
    // We only store accessToken in normal session so it can be read fast
    const sessionTokens = { 
      accessToken: tokens.accessToken, 
      expiresAt: tokens.expiresAt 
    };

    await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens: sessionTokens });
    
    if (isBio) {
      if (tokens.refreshToken) {
        await biometricService.saveSecureItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
      }
      await storage.removeItem(STORAGE_KEYS.refreshToken);
    } else {
      if (tokens.refreshToken) {
        await storage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
      } else {
        await storage.removeItem(STORAGE_KEYS.refreshToken);
      }
      await biometricService.deleteSecureItem(STORAGE_KEYS.refreshToken);
    }
  },

  clearTokens: async (): Promise<void> => {
    const session = await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession);
    if (session) {
      await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens: null });
    }
    await storage.removeItem(STORAGE_KEYS.refreshToken);
    await biometricService.deleteSecureItem(STORAGE_KEYS.refreshToken);
  },

  isExpired: (tokens: TokenPair): boolean => Date.now() >= tokens.expiresAt,
};
