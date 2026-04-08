import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';

type TopbarMenuProps = {
  onPress: () => void;
  className?: string;
};

export const TopbarMenu = ({ className, onPress }: TopbarMenuProps) => (
  <Pressable
    className={cn('h-12 w-12 overflow-hidden rounded-2xl border border-border/60 bg-card/90', className)}
    onPress={onPress}
    style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}
  >
    <View className="absolute inset-0 bg-white/10" />
    <View className="h-12 w-12 items-center justify-center">
      <Ionicons name="menu" size={20} />
    </View>
  </Pressable>
);
