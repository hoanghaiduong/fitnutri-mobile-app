import { Pressable, View } from 'react-native';

import { cn } from '@/lib/cn';
import { Text } from '@/ui/text';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
  leftEmoji?: string;
};

export const Chip = ({ className, label, leftEmoji, onPress, selected = false }: ChipProps) => (
  <Pressable
    className={cn(
      'rounded-full border px-4 py-3',
      selected ? 'border-primary bg-primary/10' : 'border-border bg-card',
      className,
    )}
    onPress={onPress}
    style={({ pressed }) => ({
      opacity: pressed ? 0.8 : 1,
    })}
  >
    <View className="flex-row items-center gap-2">
      {leftEmoji ? <Text>{leftEmoji}</Text> : null}
      <Text className="font-medium" tone={selected ? 'primary' : 'default'} variant="body-sm">
        {label}
      </Text>
    </View>
  </Pressable>
);
