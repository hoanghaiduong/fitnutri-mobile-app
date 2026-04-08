export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiErrorCode = 'UNAUTHORIZED' | 'NETWORK_ERROR' | 'TIMEOUT' | 'UNKNOWN';

export type ApiClientOptions<TBody = unknown> = {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  requiresAuth?: boolean;
  signal?: AbortSignal;
};

export type ApiResult<TData> = {
  data: TData;
  status: number;
};
