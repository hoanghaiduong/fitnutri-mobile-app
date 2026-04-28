import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const translateX = useRef(new Animated.Value(-344)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: 0,
          damping: 25,
          mass: 0.8,
          stiffness: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateX, {
          toValue: -344,
          damping: 25,
          mass: 0.8,
          stiffness: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible, overlayOpacity, translateX]);

  if (!mounted) return null;

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, elevation: 100 }} pointerEvents="box-none">
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: overlayOpacity }}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={onClose} />
      </Animated.View>

      <Animated.View
        className="w-[84%] max-w-[344px] overflow-hidden rounded-r-[32px] border-r border-border bg-card/95 absolute left-0 top-0 bottom-0"
        style={{
          transform: [{ translateX }],
          shadowColor: '#0F172A',
          shadowOffset: { width: 8, height: 0 },
          shadowOpacity: 0.14,
          shadowRadius: 24,
          elevation: 10,
        }}
        pointerEvents="auto"
      >
        <SafeAreaView className="flex-1 px-5 pb-8 pt-6">
          <View className="mb-6 flex-row items-start justify-between gap-3 rounded-[28px] border border-transparent bg-primary/10 p-4">
            <View className="flex-1 gap-1.5">
              <Text tone="primary" variant="caption">FitNutri AI</Text>
              <Text variant="heading-md">Menu điều hướng</Text>
              <Text tone="muted" variant="body-sm">
                Truy cập nhanh các màn chính của ứng dụng.
              </Text>
            </View>
          </View>

          <Pressable 
            onPress={onClose} 
            className="absolute right-4 top-10 h-10 w-10 items-center justify-center rounded-[18px] bg-card/90 shadow-sm border border-border flex-row z-20"
          >
            <Ionicons name="close" size={20} color="#0F172A" />
          </Pressable>

          <View className="gap-3">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href);

              return (
                <Button
                  key={item.href}
                  className={isActive ? 'bg-primary/10' : ''}
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
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};
