import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
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
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth-store';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CustomCheckbox = ({ checked, onChange, label }: { checked: boolean, onChange: (v: boolean) => void, label: string }) => {
  const { tokens } = useAppTheme();
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex-row items-center gap-2"
      hitSlop={8}
    >
      <View
        className="h-5 w-5 items-center justify-center rounded border"
        style={{
          backgroundColor: checked ? toRgb(tokens.colors.primary) : 'transparent',
          borderColor: checked ? toRgb(tokens.colors.primary) : toRgba(tokens.colors.border, 0.8),
        }}
      >
        {checked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </View>
      <Text tone="muted" variant="body-sm">
        {label}
      </Text>
    </Pressable>
  );
};

const LoginBody = () => {
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();
  const insets = useSafeAreaInsets();
  const { isDark, tokens } = useAppTheme();

  const [email, setEmail] = useState('debug@fitnutri.app');
  const [password, setPassword] = useState('123456');
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleLogin = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await login({ email, password, name: email.split('@')[0], provider: 'password' });
      toast('Đăng nhập thành công', 'Phiên làm việc đã khởi tạo.', 'success');
      router.replace(ROUTES.profileSetup1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await login({ provider: 'google', name: 'Google User' });
      toast('Đăng nhập Google thành công', 'Kết nối an toàn.', 'success');
      router.replace(ROUTES.profileSetup1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể đăng nhập Google.');
    }
  };

  const primaryColor = toRgb(tokens.colors.primary);
  const bgColor = toRgba(tokens.colors.primary, isDark ? 0.3 : 1);

  return (
    <View className="flex-1" style={{ backgroundColor: bgColor }}>
      {/* Background Shapes for Luxury Feel */}
      <View className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <View className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white opacity-10" />
        <View className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-white opacity-[0.07]" />
      </View>

      {/* Header Section */}
      <Animated.View
        style={[headerAnimStyle, { paddingTop: Math.max(insets.top + 20, 48) }]}
        className="px-6 pb-24 items-center"
      >
        <View className="mb-6 h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          <Ionicons name="leaf" size={28} color="#FFFFFF" />
        </View>
        <Text variant="heading-xl" style={{ color: '#FFFFFF', textAlign: 'center' }}>
          Đăng nhập vào{'\n'}tài khoản của bạn
        </Text>
        <Text variant="body-md" style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 12 }}>
          Khám phá không gian sức khỏe cá nhân hóa đỉnh cao.
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
          {/* Main Form Elements */}
          <View className="gap-5">
            <Button
              variant="outline"
              size="lg"
              leftSlot={<Ionicons name="logo-google" size={20} color={isDark ? '#FFFFFF' : '#475569'} />}
              title="Tiếp tục với Google"
              onPress={handleGoogleLogin}
              className="rounded-2xl border-border/70"
            />

            <View className="flex-row items-center justify-center gap-3 py-2">
              <View className="h-px flex-1 bg-border/50" />
              <Text tone="muted" variant="caption" className="font-semibold px-2">HOẶC</Text>
              <View className="h-px flex-1 bg-border/50" />
            </View>

            <View className="gap-4">
              <Input
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Email của bạn"
                onChangeText={setEmail}
                value={email}
                className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
                style={{ fontSize: 16 }}
              />
              <Input
                autoComplete="password"
                placeholder="Mật khẩu"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
                style={{ fontSize: 16 }}
              />
            </View>

            {error && (
              <Animated.Text entering={FadeInUp} style={{ color: toRgb(tokens.colors.destructive), fontSize: 12 }}>
                {error}
              </Animated.Text>
            )}

            <View className="flex-row items-center justify-between mt-1">
              <CustomCheckbox label="Ghi nhớ tôi" checked={rememberMe} onChange={setRememberMe} />
              <Pressable onPress={() => router.push(ROUTES.forgotPassword)} hitSlop={8}>
                <Text tone="primary" variant="body-sm" className="font-semibold">Quên mật khẩu?</Text>
              </Pressable>
            </View>

            <Button
              size="lg"
              loading={submitting}
              onPress={handleLogin}
              title="Đăng nhập"
              className="mt-2 rounded-2xl h-[56px] shadow-lg"
              style={{ shadowColor: primaryColor }}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(350).springify()} className="items-center mt-auto pt-6">
          <View className="flex-row items-center gap-2">
            <Text tone="muted" variant="body-md">Chưa có tài khoản?</Text>
            <Pressable onPress={() => router.push(ROUTES.registerStep1)} hitSlop={8}>
              <Text tone="primary" variant="body-md" className="font-bold">Đăng ký ngay</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const LuxuryLoginScreen = () => (
  <AppErrorBoundary>
    <LoginBody />
  </AppErrorBoundary>
);

export default LuxuryLoginScreen;
