import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import type { TokenPair } from '@/types/auth';

export const tokenService = {
  getTokens: async (): Promise<TokenPair | null> => {
    const session = await storage.getItem<{ tokens?: TokenPair | null }>(STORAGE_KEYS.authSession);
    return session?.tokens ?? null;
  },
  saveTokens: async (tokens: TokenPair): Promise<void> => {
    const session = await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession);
    await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens });
    await storage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
  },
  clearTokens: async (): Promise<void> => {
    const session = await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession);
    await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens: null });
    await storage.removeItem(STORAGE_KEYS.refreshToken);
  },
  isExpired: (tokens: TokenPair): boolean => Date.now() >= tokens.expiresAt,
};
