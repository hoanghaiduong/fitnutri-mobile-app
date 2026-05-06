export type AuthProvider = 'password' | 'google' | 'facebook' | 'apple' | 'phone';

export type AuthUser = {
  id?: number | string;
  username?: string;
  email: string;
  name?: string;
  phone?: string | null;
  isProfileCompleted: boolean;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type AuthSession = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  tokens?: TokenPair | null;
};
