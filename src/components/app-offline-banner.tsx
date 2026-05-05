import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useNetworkStore } from '@/store/network-store';
import { Text } from '@/ui/text';

export const AppOfflineBanner = () => {
  const isOffline = useNetworkStore((state) => state.isOffline);
  const insets = useSafeAreaInsets();
  
  // Keep track of previous state to know if we should show the "back online" state
  const [wasOffline, setWasOffline] = useState(false);
  
  const translateY = useSharedValue(-150);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isOffline) {
      setWasOffline(true);
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 14, stiffness: 100, mass: 0.8 });
    } else {
      if (wasOffline) {
        // Show success for 2 seconds, then hide
        translateY.value = withDelay(2000, withTiming(-150, { duration: 400, easing: Easing.in(Easing.cubic) }));
        opacity.value = withDelay(2000, withTiming(0, { duration: 400 }));
        // Reset state after animation finishes
        setTimeout(() => setWasOffline(false), 2500);
      } else {
        // Just hide immediately if it mounts while online
        opacity.value = 0;
        translateY.value = -150;
      }
    }
  }, [isOffline, wasOffline, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  // We only render the component content if it's currently offline, or if it was recently offline and is animating away
  if (!isOffline && !wasOffline) return null;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: 16,
          paddingHorizontal: 20,
          backgroundColor: isOffline ? '#EF4444' : '#10B981', 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 10,
        }
      ]}
    >
      <Ionicons 
        name={isOffline ? 'cloud-offline' : 'wifi'} 
        size={22} 
        color="#FFFFFF" 
      />
      <Text variant="body-sm" style={{ color: '#FFFFFF', fontWeight: '600' }}>
        {isOffline ? 'Không có kết nối mạng' : 'Đã khôi phục kết nối'}
      </Text>
    </Animated.View>
  );
};
