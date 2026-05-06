import { STORAGE_KEYS } from '@/constants/storage';
import { storage } from '@/lib/storage';
import type { TokenPair } from '@/types/auth';
import { biometricService } from '@/services/biometric-service';

export const BIOMETRIC_ENABLED_KEY = 'settings.biometric_enabled';

const TOKEN_EXPIRY_SKEW_MS = 30_000;

type StoredSession = {
  tokens?: Partial<TokenPair> | null;
} & Record<string, unknown>;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isValidExpiresAt = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const readStoredRefreshToken = async (biometricEnabled: boolean): Promise<string | null> => {
  const primaryRefreshToken = biometricEnabled
    ? await biometricService.getSecureItem(STORAGE_KEYS.refreshToken)
    : await storage.getItem<string>(STORAGE_KEYS.refreshToken);

  if (isNonEmptyString(primaryRefreshToken)) {
    return primaryRefreshToken;
  }

  const fallbackRefreshToken = biometricEnabled
    ? await storage.getItem<string>(STORAGE_KEYS.refreshToken)
    : await biometricService.getSecureItem(STORAGE_KEYS.refreshToken);

  return isNonEmptyString(fallbackRefreshToken) ? fallbackRefreshToken : null;
};

const persistRefreshToken = async (
  refreshToken: string | null,
  biometricEnabled: boolean
): Promise<void> => {
  if (!refreshToken) {
    await storage.removeItem(STORAGE_KEYS.refreshToken);
    await biometricService.deleteSecureItem(STORAGE_KEYS.refreshToken);
    return;
  }

  if (biometricEnabled) {
    await biometricService.saveSecureItem(STORAGE_KEYS.refreshToken, refreshToken);
    await storage.removeItem(STORAGE_KEYS.refreshToken);
    return;
  }

  await storage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  await biometricService.deleteSecureItem(STORAGE_KEYS.refreshToken);
};

export const tokenService = {
  isBiometricEnabled: async (): Promise<boolean> => {
    return (await storage.getItem<boolean>(BIOMETRIC_ENABLED_KEY)) ?? false;
  },
  
  setBiometricEnabled: async (enabled: boolean): Promise<void> => {
    const previousEnabled = await tokenService.isBiometricEnabled();
    const tokens = await tokenService.getTokens();
    await storage.setItem(BIOMETRIC_ENABLED_KEY, enabled);

    if (tokens) {
      await tokenService.saveTokens(tokens);
      return;
    }

    if (previousEnabled !== enabled) {
      await persistRefreshToken(null, enabled);
    }
  },

  getTokens: async (): Promise<TokenPair | null> => {
    const session = await storage.getItem<StoredSession>(STORAGE_KEYS.authSession);
    const sessionTokens = session?.tokens;
    if (!sessionTokens) return null;

    if (!isNonEmptyString(sessionTokens.accessToken) || !isValidExpiresAt(sessionTokens.expiresAt)) {
      return null;
    }
    
    const isBio = await tokenService.isBiometricEnabled();
    const storedRefreshToken = await readStoredRefreshToken(isBio);
    const sessionRefreshToken = isNonEmptyString(sessionTokens.refreshToken)
      ? sessionTokens.refreshToken
      : null;
    
    return {
      accessToken: sessionTokens.accessToken,
      expiresAt: sessionTokens.expiresAt,
      refreshToken: storedRefreshToken ?? sessionRefreshToken ?? '',
    };
  },

  saveTokens: async (tokens: TokenPair): Promise<void> => {
    if (!isNonEmptyString(tokens.accessToken) || !isValidExpiresAt(tokens.expiresAt)) {
      return;
    }

    const session = (await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession)) ?? {};
    
    const isBio = await tokenService.isBiometricEnabled();
    const refreshToken = isNonEmptyString(tokens.refreshToken)
      ? tokens.refreshToken
      : await readStoredRefreshToken(isBio);
    
    // We only store accessToken in normal session so it can be read fast
    const sessionTokens = { 
      accessToken: tokens.accessToken, 
      expiresAt: tokens.expiresAt 
    };

    await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens: sessionTokens });
    await persistRefreshToken(refreshToken, isBio);
  },

  clearTokens: async (): Promise<void> => {
    const session = await storage.getItem<Record<string, unknown>>(STORAGE_KEYS.authSession);
    if (session) {
      await storage.setItem(STORAGE_KEYS.authSession, { ...session, tokens: null });
    }
    await storage.removeItem(STORAGE_KEYS.refreshToken);
    await biometricService.deleteSecureItem(STORAGE_KEYS.refreshToken);
  },

  isExpired: (tokens: TokenPair): boolean => Date.now() >= tokens.expiresAt - TOKEN_EXPIRY_SKEW_MS,
};
