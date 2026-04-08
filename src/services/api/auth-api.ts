import { fakeApi } from '@/lib/fake-api';
import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';
import type { AuthProvider, AuthSession, TokenPair } from '@/types/auth';

const createTokenPair = (): TokenPair => ({
  accessToken: `access-${Date.now()}`,
  refreshToken: `refresh-${Date.now()}`,
  expiresAt: Date.now() + 1000 * 60 * 15,
});

type LoginPayload = {
  email?: string;
  phone?: string;
  password?: string;
  name?: string;
  provider?: AuthProvider;
};

const providerNameMap: Record<AuthProvider, string> = {
  password: 'FitNutri User',
  google: 'Google User',
  facebook: 'Facebook User',
  apple: 'Apple User',
  phone: 'SMS User',
};

const normalizePhone = (value?: string) => (value ? value.replace(/[^\d+]/g, '') : undefined);

const resolveIdentity = (payload: LoginPayload) => {
  const provider = payload.provider ?? 'password';
  const normalizedPhone = normalizePhone(payload.phone);
  const email =
    payload.email ??
    (normalizedPhone ? `phone-${normalizedPhone}@fitnutri.app` : `${provider}@fitnutri.app`);
  const fallbackName = normalizedPhone ? `User ${normalizedPhone.slice(-4)}` : providerNameMap[provider];

  return {
    email,
    name: payload.name ?? fallbackName,
  };
};

const buildSession = (payload: LoginPayload): AuthSession => {
  const identity = resolveIdentity(payload);

  return {
    isAuthenticated: true,
    user: {
      email: identity.email,
      name: identity.name,
      isProfileCompleted: false,
    },
    tokens: createTokenPair(),
  };
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthSession>> => {
    await apiClient.request({ path: '/auth/login', method: 'POST', body: payload, requiresAuth: false });

    return fakeApi.post(() => ({
      data: buildSession(payload),
      message: 'Login successful.',
    }));
  },
  resendOtp: async (): Promise<ApiResponse<{ success: true }>> => {
    await apiClient.request({ path: '/auth/resend-otp', method: 'POST', requiresAuth: false });

    return fakeApi.post(() => ({
      data: { success: true as const },
      message: 'OTP resent.',
    }), 500);
  },
  verifyOtp: async (): Promise<ApiResponse<{ success: true }>> => {
    await apiClient.request({ path: '/auth/verify-otp', method: 'POST', requiresAuth: false });

    return fakeApi.post(() => ({
      data: { success: true as const },
      message: 'OTP verified.',
    }), 500);
  },
  refreshToken: async (refreshToken: string): Promise<ApiResponse<TokenPair>> => {
    await apiClient.request({ path: '/auth/refresh', method: 'POST', body: { refreshToken }, requiresAuth: false });

    return fakeApi.post(() => ({
      data: createTokenPair(),
      message: 'Token refreshed.',
    }), 400);
  },
};
