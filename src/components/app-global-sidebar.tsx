import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ROUTES } from '@/constants/routes';
import { useAppTheme } from '@/hooks/use-app-theme';
import { toRgb, toRgba } from '@/lib/color';
import { useUIStore } from '@/store/ui-store';
import { Text } from '@/ui/text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(Math.floor(SCREEN_WIDTH * 0.82), 340);

const SPRING_CONFIG = { damping: 26, stiffness: 230, mass: 0.8 };
const CLOSE_SPRING = { damping: 28, stiffness: 260, mass: 0.8 };

const NAV_ITEMS = [
  { label: 'Trang chủ', href: '/(tabs)', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Dashboard', href: ROUTES.dashboardDetail, icon: 'grid-outline', activeIcon: 'grid' },
  { label: 'Lịch tuần', href: ROUTES.weeklyPlan, icon: 'calendar-outline', activeIcon: 'calendar' },
  { label: 'Lịch tháng', href: ROUTES.monthlyPlan, icon: 'calendar-clear-outline', activeIcon: 'calendar-clear' },
  { label: 'Thực đơn hôm nay', href: ROUTES.result, icon: 'restaurant-outline', activeIcon: 'restaurant' },
  { label: 'Cài đặt', href: '/(tabs)/settings', icon: 'settings-outline', activeIcon: 'settings' },
] as const;

export const AppGlobalSidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { isDark, tokens } = useAppTheme();

  const [mounted, setMounted] = useState(false);

  const slideX = useSharedValue(-SIDEBAR_WIDTH);
  const dimOpacity = useSharedValue(0);

  useEffect(() => {
    if (isSidebarOpen) {
      setMounted(true);
      slideX.value = withSpring(0, SPRING_CONFIG);
      dimOpacity.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.quad) });
    } else {
      dimOpacity.value = withTiming(0, { duration: 240, easing: Easing.in(Easing.quad) });
      slideX.value = withSpring(-SIDEBAR_WIDTH, CLOSE_SPRING, (finished) => {
        'worklet';
        if (finished) {
          runOnJS(setMounted)(false);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen]);

  const overlayAnimStyle = useAnimatedStyle(() => ({
    opacity: dimOpacity.value,
  }));

  const drawerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
  }));

  if (!mounted) return null;

  const paddingTop = Math.max(insets.top + 16, 32);
  const paddingBottom = Math.max(insets.bottom + 16, 24);

  // Theme-aware colors
  const drawerBg = toRgb(tokens.colors.card);
  const fg = toRgb(tokens.colors.foreground);
  const mutedFg = toRgb(tokens.colors.mutedForeground);
  const borderColor = toRgba(tokens.colors.border, isDark ? 0.4 : 0.6);
  const activeBg = toRgba(tokens.colors.primary, isDark ? 0.15 : 0.08);
  const activeIconBg = toRgba(tokens.colors.primary, isDark ? 0.22 : 0.12);
  const primaryColor = toRgb(tokens.colors.primary);
  const iconWrapBg = toRgba(tokens.colors.secondary, isDark ? 0.5 : 0.8);
  const closeBtnBg = toRgba(tokens.colors.secondary, isDark ? 0.6 : 0.9);

  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.root]}
      pointerEvents={isSidebarOpen ? 'auto' : 'none'}
    >
      {/* Dim Overlay */}
      <Animated.View style={[StyleSheet.absoluteFillObject, overlayAnimStyle]}>
        <Pressable style={styles.overlay} onPress={closeSidebar} />
      </Animated.View>

      {/* Drawer Panel */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: SIDEBAR_WIDTH,
            paddingTop,
            paddingBottom,
            backgroundColor: drawerBg,
            borderRightColor: borderColor,
            borderRightWidth: isDark ? 1 : 0,
          },
          drawerAnimStyle,
        ]}
      >
        {/* Header Brand */}
        <View style={styles.header}>
          <View style={[styles.brandBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : '#F0FDF4', borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : '#BBF7D0' }]}>
            <Ionicons name="leaf" size={16} color="#10B981" />
            <Text variant="caption" style={[styles.brandText, { color: isDark ? '#34D399' : '#059669' }]}>FitNutri AI</Text>
          </View>
          <Pressable onPress={closeSidebar} style={[styles.closeBtn, { backgroundColor: closeBtnBg }]} hitSlop={12}>
            <Ionicons name="close" size={20} color={mutedFg} />
          </Pressable>
        </View>

        <Text variant="heading-md" style={[styles.menuTitle, { color: fg }]}>Menu</Text>
        <Text tone="muted" variant="body-sm" style={styles.menuSubtitle}>
          Điều hướng nhanh
        </Text>

        <View style={[styles.divider, { backgroundColor: borderColor }]} />

        {/* Nav Items */}
        <View style={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href);
            return (
              <Pressable
                key={item.href}
                onPress={() => {
                  closeSidebar();
                  setTimeout(() => router.push(item.href as never), 160);
                }}
                style={[styles.navItem, isActive && { backgroundColor: activeBg }]}
              >
                <View style={[styles.navIconWrap, { backgroundColor: isActive ? activeIconBg : iconWrapBg }]}>
                  <Ionicons
                    name={(isActive ? item.activeIcon : item.icon) as any}
                    size={20}
                    color={isActive ? primaryColor : mutedFg}
                  />
                </View>
                <Text variant="body-md" style={[styles.navLabel, { color: isActive ? primaryColor : toRgba(tokens.colors.foreground, 0.75) }, isActive && styles.navLabelActive]}>
                  {item.label}
                </Text>
                {isActive && <View style={[styles.activeDot, { backgroundColor: primaryColor }]} />}
              </Pressable>
            );
          })}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: borderColor }]}>
          <View style={styles.footerRow}>
            <Ionicons name="shield-checkmark-outline" size={13} color="#10B981" />
            <Text variant="caption" tone="muted" style={{ marginLeft: 5 }}>
              FitNutri v1.0.0
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 9999,
    elevation: 9999,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 14, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 36,
    elevation: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  brandText: {
    marginLeft: 6,
    fontWeight: '700',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 3,
  },
  menuSubtitle: {
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginBottom: 14,
  },
  navList: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    position: 'relative',
  },
  navIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  navLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  navLabelActive: {
    fontWeight: '600',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 14,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
