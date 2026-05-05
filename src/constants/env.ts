import Constants from 'expo-constants';

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getLocalApiUrl = () => {
  // Lấy IP động từ Metro Bundler
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:8000`;
  }
  return 'http://localhost:8000'; // Fallback
};

export const ENV = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? getLocalApiUrl(),
  apiTimeoutMs: parseNumber(process.env.EXPO_PUBLIC_API_TIMEOUT_MS, 8000),
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
} as const;
