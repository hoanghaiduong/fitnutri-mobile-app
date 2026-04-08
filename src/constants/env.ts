const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const ENV = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.fitnutri.local',
  apiTimeoutMs: parseNumber(process.env.EXPO_PUBLIC_API_TIMEOUT_MS, 8000),
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
} as const;
