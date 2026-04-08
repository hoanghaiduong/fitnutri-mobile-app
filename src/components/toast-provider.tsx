import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { useToastStore } from '@/store/toast-store';
import { Text } from '@/ui/text';

const toneClasses = {
  default: 'border-border bg-card',
  success: 'border-success/30 bg-success/10',
  destructive: 'border-destructive/30 bg-destructive/10',
} as const;

const toneIcons = {
  default: 'notifications-outline',
  success: 'checkmark-circle-outline',
  destructive: 'alert-circle-outline',
} as const;

const toneIconColors = {
  default: '#334155',
  success: '#16A34A',
  destructive: '#DC2626',
} as const;

export const ToastProvider = () => {
  const items = useToastStore((state) => state.items);
  const dismiss = useToastStore((state) => state.dismiss);

  return (
    <View className="pointer-events-box-none absolute inset-x-0 top-14 z-50 px-4">
      <View className="gap-3">
        {items.map((item) => (
          <Pressable
            key={item.id}
            className={`overflow-hidden rounded-2xl border p-4 shadow-card ${toneClasses[item.tone]}`}
            onPress={() => dismiss(item.id)}
          >
            <View className="absolute inset-0 bg-white/20" />
            <View className="flex-row items-start gap-3">
              <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-full bg-card/80">
                <Ionicons color={toneIconColors[item.tone]} name={toneIcons[item.tone]} size={18} />
              </View>
              <View className="flex-1 gap-1">
                <Text variant="body-sm">{item.title}</Text>
                {item.description ? <Text tone="muted" variant="caption">{item.description}</Text> : null}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
