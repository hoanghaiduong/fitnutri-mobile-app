import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { ROUTES } from '@/constants/routes';
import { type OtpChannel, type OtpIntent } from '@/features/auth/constants';
import { useOtpCountdown } from '@/features/auth/hooks/use-otp-countdown';
import { useOtpForm } from '@/features/auth/hooks/use-otp-form';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const normalizeParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

const otpConfigMap: Record<
  OtpIntent,
  {
    heroIcon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
  }
> = {
  'phone-login': {
    heroIcon: 'chatbubble-ellipses-outline',
    title: 'Xác minh\nSố điện thoại',
    subtitle: 'Mã OTP vừa được gửi tới số điện thoại của bạn.',
  },
  register: {
    heroIcon: 'mail-open-outline',
    title: 'Xác minh\nĐăng ký',
    subtitle: 'Chỉ còn một bước xác minh để kích hoạt tài khoản mới.',
  },
  'reset-password': {
    heroIcon: 'key-outline',
    title: 'Xác nhận\nMã OTP',
    subtitle: 'Nhập mã được gửi tới email của bạn để tiếp tục.',
  },
};

const OtpBody = () => {
  const params = useLocalSearchParams<{ mode?: string | string[]; target?: string | string[]; channel?: string | string[] }>();
  const rawMode = normalizeParam(params.mode);
  const rawTarget = normalizeParam(params.target);
  const rawChannel = normalizeParam(params.channel);

  const mode: OtpIntent = rawMode === 'phone-login' || rawMode === 'register' ? rawMode : 'reset-password';
  const channel: OtpChannel = rawChannel === 'sms' ? 'sms' : 'email';
  const config = otpConfigMap[mode];

  const { form, onSubmit, submitting } = useOtpForm({ mode, target: rawTarget });
  const { canResend, remainingSeconds, resend } = useOtpCountdown();

  const insets = useSafeAreaInsets();
  const { isDark, tokens } = useAppTheme();

  // Animations
  const cardTranslateY = useSharedValue(SCREEN_HEIGHT);
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    cardTranslateY.value = withSpring(0, { damping: 18, stiffness: 120, mass: 0.8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const headerAnimStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const primaryColor = toRgb(tokens.colors.primary);
  const bgColor = toRgba(tokens.colors.primary, isDark ? 0.3 : 1);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View className="flex-1" style={{ backgroundColor: bgColor }}>
          {/* Background Shapes */}
          <View className="absolute left-0 top-0 h-full w-full overflow-hidden">
            <View className="absolute -left-20 -top-10 h-64 w-64 rounded-full bg-white opacity-10" />
            <View className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-white opacity-[0.05]" />
          </View>

          {/* Header Section */}
          <Animated.View
            style={[headerAnimStyle, { paddingTop: Math.max(insets.top + 20, 48) }]}
            className="px-6 pb-24 items-center"
          >
            <Pressable
              onPress={() => router.back()}
              className="absolute left-6"
              style={{ top: Math.max(insets.top + 20, 48) }}
              hitSlop={16}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              </View>
            </Pressable>

            <View className="mb-6 mt-1 h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
              <Ionicons name={config.heroIcon} size={28} color="#FFFFFF" />
            </View>
            <Text variant="heading-xl" style={{ color: '#FFFFFF', textAlign: 'center' }}>
              {config.title}
            </Text>
            <Text variant="body-md" style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 12 }}>
              {config.subtitle}
            </Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View
            style={[
              cardAnimStyle,
              {
                flex: 1,
                backgroundColor: toRgb(tokens.colors.background),
                borderTopLeftRadius: 44,
                borderTopRightRadius: 44,
                paddingHorizontal: 24,
                paddingTop: 36,
                paddingBottom: Math.max(insets.bottom + 20, 24),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -12 },
                shadowOpacity: 0.1,
                shadowRadius: 32,
                elevation: 24,
              },
            ]}
          >
            <Animated.View entering={FadeInDown.delay(200).springify().damping(18)} className="gap-6 flex-1">
              <View className="gap-5">
                <Controller
                  control={form.control}
                  name="code"
                  render={({ field, fieldState }) => (
                    <View className="gap-2">
                      <Input
                        keyboardType="number-pad"
                        maxLength={6}
                        placeholder="Nhập mã 6 chữ số"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        value={field.value}
                        className="h-16 rounded-xl border-border/50 bg-secondary/30 px-5 text-center"
                        style={{ fontSize: 24, letterSpacing: 8, fontWeight: '700' }}
                      />
                      {fieldState.error && (
                        <Animated.Text entering={FadeInUp} style={{ color: toRgb(tokens.colors.destructive), fontSize: 12, textAlign: 'center' }}>
                          {fieldState.error.message}
                        </Animated.Text>
                      )}
                    </View>
                  )}
                />

                <Button
                  size="lg"
                  loading={submitting}
                  onPress={onSubmit}
                  title="Xác nhận"
                  className="mt-2 rounded-2xl h-[56px] shadow-lg"
                  style={{ shadowColor: primaryColor }}
                />

                <View className="items-center mt-2">
                  <Text tone="muted" variant="caption" className="text-center mb-3">
                    {canResend
                      ? `Bạn có thể yêu cầu gửi lại ${channel === 'sms' ? 'SMS' : 'mã OTP'} ngay bây giờ.`
                      : `Chưa nhận được mã? Gửi lại sau ${remainingSeconds}s.`
                    }
                  </Text>
                  <Button
                    disabled={!canResend}
                    onPress={() => void resend()}
                    size="sm"
                    title={channel === 'sms' ? 'Gửi lại SMS' : 'Gửi lại OTP'}
                    variant="outline"
                    className="rounded-xl border-border/60 min-w-[140px]"
                  />
                </View>

              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View entering={FadeInDown.delay(350).springify()} className="items-center mt-auto pt-4">
              <Pressable onPress={() => router.replace(ROUTES.login)} hitSlop={12}>
                <Text tone="primary" variant="body-md" className="font-bold">Quay lại đăng nhập</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

const OtpScreen = () => (
  <AppErrorBoundary>
    <OtpBody />
  </AppErrorBoundary>
);

export default OtpScreen;
