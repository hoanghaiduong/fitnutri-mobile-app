import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ROUTES } from '@/constants/routes';
import { useAuthBootstrap } from '@/hooks/use-auth-bootstrap';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useAuthStore } from '@/store/auth-store';
import { toRgb } from '@/lib/color';
import { Text } from '@/ui/text';

const SPLASH_DURATION_MS = 1800; // Increased slightly for premium feel

const SplashScreen = () => {
  const hydrated = useAuthBootstrap();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const { tokens } = useAppTheme();

  // Reanimated Shared Values
  const logoScale = useSharedValue(0.4);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(24);
  const loaderOpacity = useSharedValue(0);

  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    // 1. Logo springs in
    logoScale.value = withSpring(1, { damping: 14, stiffness: 120, mass: 1 });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // 2. Text fades and slides up shortly after
    textOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    textTranslateY.value = withDelay(
      300,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) })
    );

    // 3. Loader softly fades in at the end
    loaderOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 1000 }, (finished) => {
        if (finished) {
          runOnJS(setAnimationFinished)(true);
        }
      })
    );

    // Fallback timer just in case reanimated drops the callback (common in dev mode)
    const fallbackTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, SPLASH_DURATION_MS + 200);

    return () => clearTimeout(fallbackTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only navigate when both Auth is hydrated AND animation is finished
    if (!hydrated || !animationFinished) {
      return;
    }

    const nextRoute = !isAuthenticated
      ? ROUTES.onboarding1
      : user?.isProfileCompleted
        ? ROUTES.dashboard
        : ROUTES.profileSetup1;

    setTimeout(() => {
      router.replace(nextRoute);
    }, 200); // Tiny buffer for smoothness

  }, [hydrated, isAuthenticated, user?.isProfileCompleted, animationFinished]);

  // Animated Styles
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const loaderStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background">
      <View className="flex-1 justify-between px-6 py-8">
        <View />

        <View className="items-center gap-6">
          <Animated.View
            style={[logoStyle]}
            className="h-[124px] w-[124px] items-center justify-center rounded-[36px] bg-card shadow-card border border-border"
          >
            <Text style={{ fontSize: 52 }}>🌿</Text>
          </Animated.View>

          <Animated.View style={[textStyle]} className="items-center gap-2">
            <Text variant="heading-xl">FitNutri AI</Text>
            <Text className="text-center" tone="muted" variant="body-md">
              Dinh dưỡng thông minh • Tập luyện tối ưu{'\n'}Giao diện chuẩn tĩnh
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={[loaderStyle]} className="items-center gap-3">
          <ActivityIndicator color={toRgb(tokens.colors.primary)} size="small" />
          <Text tone="muted" variant="caption">Đang chuẩn bị không gian...</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
