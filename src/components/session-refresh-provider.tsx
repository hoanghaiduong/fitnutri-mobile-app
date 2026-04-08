import { useSessionRefresh } from '@/hooks/use-session-refresh';

export const SessionRefreshProvider = () => {
  useSessionRefresh();
  return null;
};
