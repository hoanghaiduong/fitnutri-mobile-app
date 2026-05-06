import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth-store';

export const useAuthBootstrap = (): boolean => {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      return;
    }

    void hydrate();
  }, [hydrate, hydrated]);

  return hydrated;
};
