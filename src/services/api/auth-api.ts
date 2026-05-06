import { apiClient } from '@/lib/api-client';
import { isProfileCompletedFromApi } from '@/services/auth-profile-completion';
import { profileApi } from '@/services/api/profile-api';
import { tokenService } from '@/services/token-service';
import type { ApiResponse } from '@/types/api';
import type { AuthSession, AuthUser, TokenPair } from '@/types/auth';

type LoginPayload = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password?: string;
  fullName?: string;
  phone?: string;
  referralCode?: string;
};

type OtpRequestPayload = {
  target: string;
  channel: 'email' | 'sms';
  purpose: 'register' | 'reset_password';
};

type OtpVerifyPayload = {
  otpRequestId: string;
  code: string;
};

type ResetPasswordPayload = {
  verificationToken: string;
  newPassword: string;
};

const unwrapApiData = <T>(responseData: any): T => {
  return (responseData?.data ?? responseData) as T;
};

const readNutritionProfile = async (): Promise<Record<string, unknown> | null> => {
  try {
    const profileResponse = await profileApi.getProfile();
    return unwrapApiData<Record<string, unknown>>(profileResponse.data);
  } catch {
    return null;
  }
};

const buildAuthUser = (
  userData: Record<string, any>,
  nutritionProfile: Record<string, unknown> | null
): AuthUser => {
  const username = userData.username || '';
  const email = userData.email || username;
  const nestedProfile = userData.profile && typeof userData.profile === 'object'
    ? userData.profile
    : null;

  return {
    id: userData.id,
    username,
    email,
    phone: userData.phone ?? null,
    name: userData.fullName || userData.username || email,
    isProfileCompleted: isProfileCompletedFromApi(userData, nestedProfile, nutritionProfile),
  };
};

export const authApi = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthSession>> => {
    // Determine the username to send (could be email or phone based on UI mapping)
    const username = payload.username || payload.email || payload.phone || '';
    
    const response = await apiClient.request<any>({ 
      path: '/api/v3/auth/login', 
      method: 'POST', 
      body: { username, password: payload.password }, 
      requiresAuth: false 
    });

    const responseData = unwrapApiData<Record<string, any>>(response.data);
    
    const tokens: TokenPair = {
      accessToken: responseData.accessToken || responseData.access_token || '',
      refreshToken: responseData.refreshToken || responseData.refresh_token || '',
      expiresAt: Date.now() + 3600 * 1000 * 24, // Fallback expire time
    };

    await tokenService.saveTokens(tokens);

    // Fetch user details after login
    const [meResponse, nutritionProfile] = await Promise.all([
      authApi.getMe(),
      readNutritionProfile(),
    ]);

    const user = buildAuthUser(meResponse.data, nutritionProfile);

    return {
      data: {
        isAuthenticated: true,
        user,
        tokens,
      },
      message: 'Login successful.',
    };
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<any>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/register',
      method: 'POST',
      body: payload,
      requiresAuth: false,
    });
    return response;
  },

  getMe: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/me',
      method: 'GET',
      requiresAuth: true,
    });
    return {
      data: unwrapApiData(response.data),
      message: response.data?.message,
    };
  },

  requestOtp: async (payload: OtpRequestPayload): Promise<ApiResponse<any>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/otp/request',
      method: 'POST',
      body: payload,
      requiresAuth: false,
    });
    return response;
  },

  verifyOtp: async (payload: OtpVerifyPayload): Promise<ApiResponse<any>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/otp/verify',
      method: 'POST',
      body: payload,
      requiresAuth: false,
    });
    return response;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse<any>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/reset-password',
      method: 'POST',
      body: payload,
      requiresAuth: false,
    });
    return response;
  },

  logout: async (): Promise<ApiResponse<any>> => {
    try {
      await apiClient.request({ path: '/api/v3/auth/logout', method: 'POST', requiresAuth: true });
    } catch (e) {
      // Ignore errors on logout
    }
    await tokenService.clearTokens();
    return { data: {}, message: 'Logged out successfully', status: 200 };
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<TokenPair>> => {
    const response = await apiClient.request<any>({
      path: '/api/v3/auth/refresh',
      method: 'POST',
      body: { refreshToken },
      requiresAuth: false,
    });
    
    const responseData = response.data?.data || response.data;

    return {
      data: {
        accessToken: responseData?.accessToken || responseData?.access_token || '',
        refreshToken: responseData?.refreshToken || responseData?.refresh_token || '',
        expiresAt: Date.now() + 3600 * 1000 * 24,
      },
      status: response.status,
    };
  }
};
