import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { Text } from '@/ui/text';

const CENTER_BUTTON_SIZE = 76;
const CENTER_BUTTON_SLOT_SIZE = 96;
const CENTER_NOTCH_SIZE = 86;
const CENTER_NOTCH_VISIBLE_HEIGHT = CENTER_NOTCH_SIZE / 2;
const CENTER_BUTTON_TOP_OFFSET = -30;

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

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        onPress={onPress}
        style={({ pressed }) => ({
          alignItems: 'center',
          flex: 1,
          opacity: pressed ? 0.82 : 1,
          paddingHorizontal: 4,
        })}
      >
        <View style={{ alignItems: 'center', gap: 4 }}>
          {options.tabBarIcon
            ? options.tabBarIcon({
                color,
                focused,
                size: focused ? 30 : 28,
              })
            : null}
          <Text
            variant="caption"
            style={{
              color,
              fontSize: focused ? 13 : 12,
              fontWeight: focused ? '700' : '600',
            }}
          >
            {label}
          </Text>
        </View>
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
          marginHorizontal: 18,
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
                minHeight: 104,
                paddingBottom: 14,
                paddingHorizontal: 18,
                paddingTop: 32,
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
          <Pressable
            accessibilityLabel="Mở nhanh dashboard chi tiết"
            onPress={() => router.push(ROUTES.dashboardDetail)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
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
                  borderRadius: 22,
                  height: 46,
                  justifyContent: 'center',
                  width: 46,
                }}
              >
                <Ionicons color={activeColor} name="heart-outline" size={30} />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
