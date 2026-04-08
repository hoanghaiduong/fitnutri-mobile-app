import { ENV } from '@/constants/env';
import { AppError } from '@/lib/app-error';
import { tokenService } from '@/services/token-service';
import type { ApiClientOptions, ApiResult } from '@/types/network';

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new AppError('Request timeout.', 'TIMEOUT')), timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeout);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

export const apiClient = {
  request: async <TData, TBody = unknown>(options: ApiClientOptions<TBody>): Promise<ApiResult<TData>> => {
    const tokens = options.requiresAuth ? await tokenService.getTokens() : null;

    if (options.requiresAuth && !tokens) {
      throw new AppError('Unauthorized.', 'UNAUTHORIZED', 401);
    }

    const requestPromise = Promise.resolve({
      data: {} as TData,
      status: 200,
      meta: {
        path: `${ENV.apiBaseUrl}${options.path}`,
        method: options.method ?? 'GET',
        authorized: Boolean(tokens),
      },
    });

    const response = await withTimeout(requestPromise, ENV.apiTimeoutMs);
    return { data: response.data, status: response.status };
  },
};
