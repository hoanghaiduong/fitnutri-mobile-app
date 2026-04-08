import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/constants/routes';
import { useAuthBootstrap } from '@/hooks/use-auth-bootstrap';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useAuthStore } from '@/store/auth-store';

const SplashScreen = () => {
  const hydrated = useAuthBootstrap();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const { tokens } = useAppTheme();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const timeout = setTimeout(() => {
      const nextRoute = !isAuthenticated
        ? ROUTES.onboarding1
        : user?.isProfileCompleted
          ? ROUTES.dashboard
          : ROUTES.profileSetup1;

      router.replace(nextRoute);
    }, 900);

    return () => clearTimeout(timeout);
  }, [hydrated, isAuthenticated, user?.isProfileCompleted]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: `rgb(${tokens.colors.background})` }}>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 28 }}>
        <View />

        <View style={{ alignItems: 'center', gap: 20 }}>
          <View
            style={{
              width: 124,
              height: 124,
              borderRadius: 36,
              backgroundColor: `rgb(${tokens.colors.card})`,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.12,
              shadowRadius: 24,
              elevation: 8,
            }}
          >
            <Text style={{ fontSize: 52 }}>🌿</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 8 }}>
            <Text style={{ color: `rgb(${tokens.colors.foreground})`, fontSize: 30, fontWeight: '700' }}>FitNutri AI</Text>
            <Text style={{ color: `rgb(${tokens.colors.mutedForeground})`, fontSize: 16, textAlign: 'center', lineHeight: 24 }}>
              Dinh dưỡng thông minh • Tập luyện tối ưu • Giao diện gọn gàng
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', gap: 12 }}>
          <ActivityIndicator size="small" color={`rgb(${tokens.colors.primary})`} />
          <Text style={{ color: `rgb(${tokens.colors.mutedForeground})`, fontSize: 13 }}>Đang chuẩn bị trải nghiệm...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
