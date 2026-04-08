import { AppError } from '@/lib/app-error';

export type RequestState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export const createRequestState = <T>(): RequestState<T> => ({
  data: null,
  error: null,
  loading: false,
});

export const normalizeError = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};
