import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, View } from 'react-native';

import { ROUTES } from '@/constants/routes';
import { Button } from '@/ui/button';
import { Text } from '@/ui/text';

type AppSidebarProps = {
  visible: boolean;
  onClose: () => void;
};

const items = [
  { label: 'Dashboard', href: ROUTES.dashboardDetail, icon: 'grid-outline' },
  { label: 'Lịch tuần', href: ROUTES.weeklyPlan, icon: 'calendar-outline' },
  { label: 'Lịch tháng', href: ROUTES.monthlyPlan, icon: 'calendar-clear-outline' },
  { label: 'Thực đơn hôm nay', href: ROUTES.result, icon: 'restaurant-outline' },
  { label: 'Cài đặt', href: '/(tabs)/settings', icon: 'settings-outline' },
] as const;

export const AppSidebar = ({ onClose, visible }: AppSidebarProps) => {
  const pathname = usePathname();
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(36)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 36,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setMounted(false);
      }
    });
  }, [overlayOpacity, translateX, visible]);

  if (!mounted) {
    return null;
  }

  return (
    <Modal animationType="none" transparent visible={mounted} onRequestClose={onClose}>
      <View className="flex-1 flex-row">
        <Animated.View className="flex-1" style={{ opacity: overlayOpacity }}>
          <Pressable className="flex-1 bg-black/30" onPress={onClose} />
        </Animated.View>

        <Animated.View
          className="w-[84%] max-w-[344px] overflow-hidden rounded-l-[32px] border-l border-border/20 bg-card/95"
          style={{
            transform: [{ translateX }],
            shadowColor: '#0F172A',
            shadowOffset: { width: -8, height: 0 },
            shadowOpacity: 0.14,
            shadowRadius: 24,
            elevation: 10,
          }}
        >
          <View className="flex-1 px-5 pb-8 pt-14">
            <View className="mb-6 flex-row items-start justify-between gap-3 rounded-[28px] border border-primary/10 bg-primary/10 p-4">
              <View className="flex-1 gap-1.5">
                <Text tone="primary" variant="caption">FitNutri AI</Text>
                <Text variant="heading-md">Menu điều hướng</Text>
                <Text tone="muted" variant="body-sm">
                  Truy cập nhanh các màn chính của ứng dụng.
                </Text>
              </View>
              <Pressable onPress={onClose} className="h-10 w-10 items-center justify-center rounded-[18px] bg-card/90">
                <Ionicons name="close" size={18} color="#0F172A" />
              </Pressable>
            </View>

            <View className="gap-3">
              {items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href);

                return (
                  <Button
                    key={item.href}
                    className={isActive ? 'border-primary/25 bg-primary/10' : ''}
                    leftSlot={<Ionicons color={isActive ? '#2563EB' : '#64748B'} name={item.icon} size={18} />}
                    onPress={() => {
                      onClose();
                      setTimeout(() => {
                        router.push(item.href as never);
                      }, 140);
                    }}
                    title={item.label}
                    variant="outline"
                  />
                );
              })}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
