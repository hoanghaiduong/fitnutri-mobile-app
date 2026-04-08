import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { ROUTES } from '@/constants/routes';

const IndexPage = () => {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      router.replace(ROUTES.splash);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', gap: 12 }}>
      <ActivityIndicator size="small" color="#2563EB" />
      <Text style={{ color: '#0F172A', fontSize: 16, fontWeight: '600' }}>Đang khởi động FitNutri AI...</Text>
    </View>
  );
};

export default IndexPage;
