import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { PanResponder, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { ROUTES } from '@/constants/routes';
import { onboardingSlides } from '@/features/auth/constants';
import { OnboardingHero } from '@/features/auth/components/onboarding-hero';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb } from '@/lib/color';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Text } from '@/ui/text';

const stepRouteMap = [ROUTES.onboarding1, ROUTES.onboarding2, ROUTES.onboarding3] as const;

const OnboardingBody = () => {
  const { step } = useLocalSearchParams<{ step?: string }>();
  const { tokens } = useAppTheme();
  const iconColor = toRgb(tokens.colors.foreground);

  const normalizedStep = useMemo(() => {
    if (step === 'step-2') return 1;
    if (step === 'step-3') return 2;
    return 0;
  }, [step]);

  const slide = onboardingSlides[normalizedStep] ?? onboardingSlides[0];
  const isLastStep = normalizedStep === onboardingSlides.length - 1;
  const canGoBack = normalizedStep > 0;

  const goToPrevious = () => {
    if (!canGoBack) {
      return;
    }

    router.replace(stepRouteMap[normalizedStep - 1]);
  };

  const goToNext = () => {
    if (isLastStep) {
      router.replace(ROUTES.login);
      return;
    }

    router.replace(stepRouteMap[normalizedStep + 1]);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 16 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx > 48) {
            goToPrevious();
            return;
          }

          if (gestureState.dx < -48) {
            goToNext();
          }
        },
      }),
    [canGoBack, isLastStep, normalizedStep],
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-background">
      <View className="flex-1 px-5 py-6" {...panResponder.panHandlers}>
        <View className="flex-row items-center justify-between">
          {canGoBack ? (
            <Button
              leftSlot={<Ionicons color={iconColor} name="chevron-back" size={18} />}
              onPress={goToPrevious}
              size="sm"
              title="Quay lại"
              variant="ghost"
            />
          ) : (
            <View className="w-24" />
          )}
          <Button onPress={() => router.replace(ROUTES.login)} size="sm" title="Bỏ qua" variant="ghost" />
        </View>

        <View className="flex-1 justify-center gap-7">
          <Card elevated glass className="gap-5 rounded-[32px] p-5">
            <View className="flex-row items-start justify-between">
              <Badge label="FitNutri AI" variant="primary" />
              <Text tone="muted" variant="caption">
                Vuốt để di chuyển
              </Text>
            </View>
            <OnboardingHero accent={slide.accent} />
          </Card>

          <View className="items-center gap-3 px-2">
            <Text className="text-center" variant="heading-xl">
              {slide.title}
            </Text>
            <Text className="text-center" tone="muted" variant="body-sm">
              {slide.description}
            </Text>
          </View>
        </View>

        <View className="gap-6">
          <View className="flex-row items-center justify-center gap-2">
            {onboardingSlides.map((item, index) => (
              <View key={item.id} className={`${index === normalizedStep ? 'w-7 bg-primary' : 'w-2.5 bg-primary/20'} h-2.5 rounded-full`} />
            ))}
          </View>

          <View className="flex-row items-center gap-3">
            {canGoBack ? (
              <Button
                className="flex-1"
                leftSlot={<Ionicons color={iconColor} name="arrow-back" size={18} />}
                onPress={goToPrevious}
                size="lg"
                title="Lùi lại"
                variant="outline"
              />
            ) : null}
            <Button className="flex-1" onPress={goToNext} size="lg" title={isLastStep ? 'Bắt đầu ngay' : 'Tiếp tục'} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const OnboardingScreen = () => (
  <AppErrorBoundary>
    <OnboardingBody />
  </AppErrorBoundary>
);

export default OnboardingScreen;
