import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { useNetworkStore } from '@/store/network-store';
import { useAuthStore } from '@/store/auth-store';

export const useNetworkMonitor = () => {
  const setOffline = useNetworkStore((state) => state.setOffline);
  const refreshSession = useAuthStore((state) => state.refreshSession);
  const isOffline = useNetworkStore((state) => state.isOffline);
  const prevOfflineRef = useRef(isOffline);

  useEffect(() => {
    prevOfflineRef.current = isOffline;
  }, [isOffline]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isConnected is false when there is no network connection at all.
      // We explicitly check for false, because it might be null initially.
      const offline = state.isConnected === false;
      setOffline(offline);

      // Trigger auto-reconnect if it was offline and now is online
      if (prevOfflineRef.current === true && offline === false) {
         void refreshSession();
         // In a real app with react-query, we would also invalidate queries here
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setOffline, refreshSession]);
};
