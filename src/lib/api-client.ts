import { ENV } from '@/constants/env';
import { AppError } from '@/lib/app-error';
import { tokenService } from '@/services/token-service';
import type { ApiClientOptions, ApiResult } from '@/types/network';
import { apiAdapter } from './api-adapter';
import { useNetworkStore } from '@/store/network-store';
import { router } from 'expo-router';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

export const apiClient = {
  request: async <TData, TBody = unknown>(options: ApiClientOptions<TBody>, isRetry = false): Promise<ApiResult<TData>> => {
    if (useNetworkStore.getState().isOffline) {
      throw new AppError('Không có kết nối mạng.', 'NETWORK_ERROR', 0);
    }

    let tokens = options.requiresAuth ? await tokenService.getTokens() : null;

    if (options.requiresAuth && !tokens) {
      throw new AppError('Unauthorized.', 'UNAUTHORIZED', 401);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (options.requiresAuth && tokens) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    }

    const url = `${ENV.apiBaseUrl}${options.path}`;

    let requestBody: BodyInit | undefined = undefined;
    if (options.body) {
      if (options.body instanceof FormData) {
        requestBody = options.body;
        delete headers['Content-Type']; // Let browser/fetch set boundary automatically
      } else {
        requestBody = JSON.stringify(apiAdapter.toBackend(options.body));
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ENV.apiTimeoutMs);
    const signal = options.signal || controller.signal;

    const fetchPromise = fetch(url, {
      method: options.method ?? 'GET',
      headers,
      body: requestBody,
      signal,
    });

    try {
      const response = await fetchPromise;
      clearTimeout(timeoutId);

      if (response.status === 401 && options.requiresAuth && !isRetry) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const refreshRes = await fetch(`${ENV.apiBaseUrl}/api/v3/auth/refresh`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh_token: tokens?.refreshToken }),
            });
            
            if (!refreshRes.ok) throw new Error('Refresh failed');
            
            const refreshData = await refreshRes.json();
            const newTokens = {
              accessToken: refreshData.data?.access_token || refreshData.access_token || '',
              refreshToken: refreshData.data?.refresh_token || refreshData.refresh_token || '',
              expiresAt: tokens?.expiresAt || Date.now() + 3600 * 1000 * 24 // 24 hours fallback
            };
            await tokenService.saveTokens(newTokens);
            isRefreshing = false;
            onRefreshed(newTokens.accessToken);
          } catch (err) {
            isRefreshing = false;
            await tokenService.clearTokens();
            router.replace('/auth/login');
            throw new AppError('Session expired.', 'UNAUTHORIZED', 401);
          }
        }

        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((newToken) => {
            apiClient.request<TData, TBody>(options, true).then(resolve).catch(reject);
          });
        });
      }

      const responseText = await response.text();
      let responseData: any = {};
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        responseData = responseText;
      }

      if (!response.ok) {
        throw new AppError(responseData?.message || 'Request failed', 'NETWORK_ERROR', response.status, responseData);
      }

      const parsedData = apiAdapter.toFrontend<TData>(responseData);
      return { data: parsedData, status: response.status };

    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new AppError('Request timeout.', 'TIMEOUT', 408);
      }
      if (error instanceof AppError) throw error;
      throw new AppError(error instanceof Error ? error.message : 'Unknown error', 'UNKNOWN', 500);
    }
  },
};
