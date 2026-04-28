import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Text } from '@/ui/text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const TAB_SPRING = { damping: 14, stiffness: 380, mass: 0.5 };

const CENTER_BUTTON_SIZE = 52;
const CENTER_BUTTON_SLOT_SIZE = 68;
const CENTER_NOTCH_SIZE = 62;
const CENTER_NOTCH_VISIBLE_HEIGHT = CENTER_NOTCH_SIZE / 2;
const CENTER_BUTTON_TOP_OFFSET = -(CENTER_BUTTON_SIZE / 2);

const getLabel = (options: BottomTabBarProps['descriptors'][string]['options'], fallback: string) => {
  if (typeof options.tabBarLabel === 'string') {
    return options.tabBarLabel;
  }

  if (typeof options.title === 'string') {
    return options.title;
  }

  return fallback;
};

export const FloatingTabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark, tokens } = useAppTheme();
  const activeColor = toRgb(tokens.colors.primary);
  const inactiveColor = toRgba(tokens.colors.mutedForeground, isDark ? 0.92 : 0.76);
  const midPoint = Math.ceil(state.routes.length / 2);
  const leftRoutes = state.routes.slice(0, midPoint);
  const rightRoutes = state.routes.slice(midPoint);

  const renderTabItem = (route: BottomTabBarProps['state']['routes'][number], index: number) => {
    const focused = state.index === index;
    const { options } = descriptors[route.key];
    const label = getLabel(options, route.name);
    const color = focused ? activeColor : inactiveColor;

    const onPress = () => {
      const event = navigation.emit({
        canPreventDefault: true,
        target: route.key,
        type: 'tabPress',
      });

      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    const tabScale = useSharedValue(1);
    const tabAnimStyle = useAnimatedStyle(() => ({
      transform: [{ scale: tabScale.value }],
    }));

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        onPress={onPress}
        onPressIn={() => { tabScale.value = withSpring(0.92, TAB_SPRING); }}
        onPressOut={() => { tabScale.value = withSpring(1, TAB_SPRING); }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Animated.View style={[{ alignItems: 'center', gap: 3, width: '100%' }, tabAnimStyle]}>
          {/* Pill glow behind active icon */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused
                ? toRgba(tokens.colors.primary, isDark ? 0.18 : 0.12)
                : 'transparent',
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            {options.tabBarIcon
              ? options.tabBarIcon({
                  color,
                  focused,
                  size: 22,
                })
              : null}
          </View>
          <Text
            variant="caption"
            style={{
              color,
              fontSize: 10,
              fontWeight: focused ? '700' : '500',
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {label}
          </Text>
          {/* Active dot indicator */}
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: focused ? activeColor : 'transparent',
              marginTop: -1,
            }}
          />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View
      pointerEvents="box-none"
      style={{
        bottom: 0,
        left: 0,
        paddingBottom: Math.max(insets.bottom, 12),
        position: 'absolute',
        right: 0,
      }}
    >
      <View
        style={{
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            shadowColor: '#0F172A',
            shadowOffset: { width: 0, height: 18 },
            shadowOpacity: isDark ? 0.32 : 0.12,
            shadowRadius: 28,
            elevation: 20,
          }}
        >
          <BlurView
            intensity={isDark ? 38 : 70}
            tint={isDark ? 'dark' : 'light'}
            style={{
              borderColor: toRgba(tokens.colors.border, isDark ? 0.52 : 0.84),
              borderRadius: 34,
              borderWidth: 1,
              overflow: 'hidden',
            }}
          >
            <View
                style={{
                  backgroundColor: toRgba(tokens.colors.card, isDark ? 0.88 : 0.94),
                  minHeight: 70,
                  paddingBottom: 12,
                  paddingHorizontal: 12,
                  paddingTop: 18,
                }}
            >
              <View
                style={{
                  backgroundColor: toRgba(tokens.colors.foreground, isDark ? 0.08 : 0.05),
                  height: 1,
                  left: 0,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              />

              <View
                style={{
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  {leftRoutes.map((route, index) => renderTabItem(route, index))}
                </View>

                <View style={{ width: CENTER_BUTTON_SLOT_SIZE }} />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                  {rightRoutes.map((route, index) => renderTabItem(route, index + midPoint))}
                </View>
              </View>
            </View>
          </BlurView>
        </View>

        <View
          pointerEvents="none"
          style={{
            alignItems: 'center',
            left: 0,
            overflow: 'hidden',
            position: 'absolute',
            right: 0,
            top: 0,
            height: CENTER_NOTCH_VISIBLE_HEIGHT,
            zIndex: 6,
          }}
        >
          <View
            style={{
              backgroundColor: toRgb(tokens.colors.background),
              borderRadius: CENTER_NOTCH_SIZE / 2,
              height: CENTER_NOTCH_SIZE,
              marginTop: -CENTER_NOTCH_VISIBLE_HEIGHT,
              width: CENTER_NOTCH_SIZE,
            }}
          />
        </View>

        <View
          pointerEvents="box-none"
          style={{
            alignItems: 'center',
            left: 0,
            position: 'absolute',
            right: 0,
            top: CENTER_BUTTON_TOP_OFFSET,
            zIndex: 10,
          }}
        >
          <CenterButton router={router} activeColor={activeColor} tokens={tokens} isDark={isDark} />
        </View>
      </View>
    </View>
  );
};

// Separated component so pulse animation doesn't re-render the entire tab bar
const CenterButton = ({ router, activeColor, tokens, isDark }: any) => {
  const pulseScale = useSharedValue(1);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value * pressScale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityLabel="Mở nhanh dashboard chi tiết"
      onPress={() => router.push(ROUTES.dashboardDetail)}
      onPressIn={() => { pressScale.value = withSpring(0.92, TAB_SPRING); }}
      onPressOut={() => { pressScale.value = withSpring(1, TAB_SPRING); }}
      style={animStyle}
    >
      <View
        style={{
          alignItems: 'center',
          backgroundColor: toRgb(tokens.colors.card),
          borderColor: toRgba(tokens.colors.border, isDark ? 0.54 : 0.9),
          borderRadius: CENTER_BUTTON_SIZE / 2,
          borderWidth: 1,
          height: CENTER_BUTTON_SIZE,
          justifyContent: 'center',
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: isDark ? 0.3 : 0.14,
          shadowRadius: 20,
          width: CENTER_BUTTON_SIZE,
          elevation: 16,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: toRgba(tokens.colors.primary, isDark ? 0.12 : 0.08),
            borderRadius: 18,
            height: 38,
            justifyContent: 'center',
            width: 38,
          }}
        >
          <Ionicons color={activeColor} name="sparkles" size={28} />
        </View>
      </View>
    </AnimatedPressable>
  );
};
