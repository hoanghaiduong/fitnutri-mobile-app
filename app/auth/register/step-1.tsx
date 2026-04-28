import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AppErrorBoundary } from '@/components/app-error-boundary';
import { ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Text } from '@/ui/text';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const RegisterStep1Body = () => {
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

        <View className="absolute right-6 items-center justify-center rounded-2xl bg-white/20 px-3 py-1.5 backdrop-blur-md border border-white/30" style={{ top: Math.max(insets.top + 20, 48) + 4 }}>
          <Text variant="caption" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Bước 1/2</Text>
        </View>

        <View className="mb-6 mt-1 h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30">
          <Ionicons name="person-add-outline" size={28} color="#FFFFFF" />
        </View>
        <Text variant="heading-xl" style={{ color: '#FFFFFF', textAlign: 'center' }}>
          Tạo tài khoản{'\n'}Mới
        </Text>
        <Text variant="body-md" style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 12 }}>
          Thông tin cơ bản để bắt đầu hành trình.
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
          <View className="gap-4">
            <Input 
              placeholder="Họ và tên (VD: Nguyễn Văn A)" 
              className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
              style={{ fontSize: 16 }}
            />
            <Input 
              autoCapitalize="none" 
              autoComplete="email" 
              placeholder="Email" 
              className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
              style={{ fontSize: 16 }}
            />
            <Input 
              autoComplete="new-password" 
              placeholder="Mật khẩu" 
              secureTextEntry 
              className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
              style={{ fontSize: 16 }}
            />
            <Input 
              autoComplete="new-password" 
              placeholder="Nhập lại mật khẩu" 
              secureTextEntry 
              className="h-14 rounded-xl border-border/50 bg-secondary/30 px-5"
              style={{ fontSize: 16 }}
            />

            <Button
              size="lg"
              leftSlot={<Ionicons color="#FFFFFF" name="arrow-forward" size={18} />}
              onPress={() => router.push(ROUTES.registerStep2)}
              title="Tiếp tục"
              className="mt-4 rounded-2xl h-[56px] shadow-lg flex-row-reverse"
              style={{ shadowColor: primaryColor }}
            />
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View entering={FadeInDown.delay(350).springify()} className="items-center mt-auto pt-6">
          <View className="flex-row items-center gap-2">
            <Text tone="muted" variant="body-md">Đã có tài khoản?</Text>
            <Pressable onPress={() => router.replace(ROUTES.login)} hitSlop={8}>
              <Text tone="primary" variant="body-md" className="font-bold">Đăng nhập</Text>
            </Pressable>
          </View>
        </Animated.View>

      </Animated.View>
    </View>
  );
};

const RegisterStep1Screen = () => (
  <AppErrorBoundary>
    <RegisterStep1Body />
  </AppErrorBoundary>
);

export default RegisterStep1Screen;
