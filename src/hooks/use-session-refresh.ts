import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth-store';

export const useSessionRefresh = (): void => {
  const tokens = useAuthStore((state) => state.tokens);
  const refreshSession = useAuthStore((state) => state.refreshSession);

  useEffect(() => {
    if (!tokens) {
      return;
    }

    const refreshInMs = Math.max(5000, tokens.expiresAt - Date.now() - 60000);
    const timer = setTimeout(() => {
      void refreshSession();
    }, refreshInMs);

    return () => clearTimeout(timer);
  }, [refreshSession, tokens]);
};
