export type AuthProvider = 'password' | 'google' | 'facebook' | 'apple' | 'phone';

export type AuthUser = {
  email: string;
  name?: string;
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
